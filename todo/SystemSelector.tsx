'use client';

import { useEffect, useState } from 'react';
import { getBundledSystems } from 'haircare-ingredients-analyzer';
import Link from 'next/link';
import { InformationCircleIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { Info, ListBullet } from 'lucide-react';

interface System {
  id: string;
  name: string;
  description: string;
  settings: string[];
}

interface SystemSelectorProps {
  value: string;
  onChange: (systemId: string, customSettings?: string[]) => void;
}

export default function SystemSelector({ value, onChange }: SystemSelectorProps) {
  const [systems, setSystems] = useState<System[]>([]);

  useEffect(() => {
    // Load systems on component mount
    const bundledSystems = getBundledSystems();
    setSystems(bundledSystems);
  }, []);

  const selectedSystem = systems.find(s => s.id === value);

  return (
    <div className="space-y-4">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Analysis System</span>
          <span className="label-text-alt flex items-center gap-2">
            {selectedSystem?.description}
            <Link
              href={`/systems/${value}`}
              className="inline-flex items-center hover:text-primary"
              title="Learn more about this system"
            >
              <InformationCircleIcon className="w-4 h-4" />
            </Link>

          </span>
        </label>
        <select
          className="select select-bordered bg-base-200 text-base-content w-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {systems.map(system => (
            <option key={system.id} value={system.id}>
              {system.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
