'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface HairPatternVisualizationProps {
  className?: string;
}

export default function HairPatternVisualization({
  className = '',
}: HairPatternVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    strands: THREE.Mesh[];
    animationId: number | null;
  } | null>(null);
  const [tightness, setTightness] = useState(6); // Start with tightest coils

  // Helper to make hair-like material
  const makeHairMaterial = (color: number, variation: number = 0) => {
    // Add slight color variation between strands
    const r = ((color >> 16) & 0xff) + variation;
    const g = ((color >> 8) & 0xff) + variation;
    const b = (color & 0xff) + variation;
    const adjustedColor =
      (Math.min(255, r) << 16) | (Math.min(255, g) << 8) | Math.min(255, b);

    return new THREE.MeshToonMaterial({
      color: adjustedColor,
      gradientMap: null,
    });
  };

  // Function to create or update the hair strand
  const createHairStrand = useCallback(
    (scene: THREE.Scene, tightnessValue: number): THREE.Mesh => {
      // Clean up old strand if it exists
      if (sceneRef.current?.strands?.[0]) {
        const oldStrand = sceneRef.current.strands[0];
        scene.remove(oldStrand);
        oldStrand.geometry.dispose();
        if (Array.isArray(oldStrand.material)) {
          oldStrand.material.forEach((mat) => mat.dispose());
        } else {
          oldStrand.material.dispose();
        }
      }

      const hairColor = 0x4a3428; // Dark brown hair color

      // Create helix path
      class HelixCurve extends THREE.Curve<THREE.Vector3> {
        constructor(private tightness: number) {
          super();
        }

        getPoint(t: number): THREE.Vector3 {
          const angle = t * this.tightness * Math.PI * 2;
          return new THREE.Vector3(Math.cos(angle), t * 8, Math.sin(angle));
        }
      }

      const path = new HelixCurve(tightnessValue);

      const geometry = new THREE.TubeGeometry(path, 200, 0.15, 12, false);
      const material = makeHairMaterial(hairColor);
      const strand = new THREE.Mesh(geometry, material);
      strand.position.y = 1;
      scene.add(strand);

      return strand;
    },
    [],
  );

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Initialize scene
    const scene = new THREE.Scene();
    const aspect = 1;
    const zoom = 8;
    const camera = new THREE.OrthographicCamera(
      -zoom * aspect,
      zoom * aspect,
      zoom,
      -zoom,
      0.1,
      100,
    );
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const size = Math.min(300, container.clientWidth || 300);
    renderer.setSize(size, size);
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newSize = Math.min(300, container.clientWidth || 300);
      renderer.setSize(newSize, newSize);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Comic sky background
    scene.background = new THREE.Color(0x4fc3f7);

    // Lighting
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    // Ground disk
    const groundGeo = new THREE.CircleGeometry(6, 64);
    const groundMat = new THREE.MeshToonMaterial({ color: 0xfff59d });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    // Create initial hair strand
    const strand = createHairStrand(scene, tightness);

    // Animation loop
    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);

      // Rotate the strand
      if (sceneRef.current?.strands?.[0]) {
        sceneRef.current.strands[0].rotation.y += 0.02;
      }

      renderer.render(scene, camera);
    }

    animationId = requestAnimationFrame(animate);

    // Store refs
    sceneRef.current = {
      scene,
      camera,
      renderer,
      strands: [strand],
      animationId,
    };

    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (sceneRef.current) {
        if (sceneRef.current.strands) {
          sceneRef.current.strands.forEach((strand) => {
            sceneRef.current!.scene.remove(strand);
            strand.geometry.dispose();
            if (Array.isArray(strand.material)) {
              strand.material.forEach((mat) => mat.dispose());
            } else {
              strand.material.dispose();
            }
          });
        }
        sceneRef.current.renderer.dispose();
        if (container.contains(sceneRef.current.renderer.domElement)) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [createHairStrand, tightness]);

  // Update hair strand when tightness changes
  useEffect(() => {
    if (!sceneRef.current?.scene) return;

    const strand = createHairStrand(sceneRef.current.scene, tightness);

    // Update refs
    if (sceneRef.current) {
      sceneRef.current.strands = [strand];
    }
  }, [createHairStrand, tightness]);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div ref={containerRef} className="w-full max-w-[300px] aspect-square" />
      <div className="w-full max-w-[300px] space-y-3">
        <label className="form-control w-full">
          <div className="label justify-center">
            <span className="label-text font-semibold text-xs whitespace-pre-wrap">
              Move the to left to increase elongation and to the right to
              increase shrinkage.
            </span>
          </div>
          <div className="flex justify-center">
            <input
              type="range"
              min="1"
              max="6"
              step="0.1"
              value={tightness}
              onChange={(e) => setTightness(parseFloat(e.target.value))}
              className="range range-primary max-w-[300px]"
            />
          </div>
          <div className="w-full flex justify-between text-xs px-2 mt-1 max-w-[300px] mx-auto">
            <span className="text-base-content/70">Loose (Swavy)</span>
            <span className="text-base-content/70">Tight (Tightly Coiled)</span>
          </div>
        </label>
      </div>
    </div>
  );
}
