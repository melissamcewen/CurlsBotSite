'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';
import { useRef, useEffect } from 'react';

export default function Navbar() {
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickedSummary = target.closest('summary');
      const clickedDetails = target.closest('details');

      if (clickedSummary) {
        // Close all other details elements except the one being clicked
        document.querySelectorAll('details').forEach((details) => {
          if (details !== clickedDetails) {
            details.open = false;
          }
        });
      } else if (!target.closest('.menu li a')) {
        // Close all details elements when clicking outside
        document.querySelectorAll('details').forEach((details) => {
          details.open = false;
        });
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleBlur = (e: React.FocusEvent) => {
    // Check if the new focus target is outside the menu
    if (!mobileMenuRef.current?.contains(e.relatedTarget as Node)) {
      const checkbox = mobileMenuRef.current?.querySelector('[tabindex="0"]');
      if (checkbox instanceof HTMLElement) {
        checkbox.blur();
      }
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Find the closest details element and close it
    const details = (e.target as HTMLElement).closest('details');
    if (details) {
      details.open = false;
    }
  };

  return (
    <header className="navbar bg-accent/90 text-accent-content backdrop-blur-sm sticky top-0 z-50">
      <div className="navbar-start">
        <Link
          href="/"
          className="btn bg-white text-black normal-case text-xl gap-2 hover:bg-white/90"
        >
          <Image
            src="/logo.svg"
            alt="CurlsBot Logo"
            width={24}
            height={24}
            priority
          />
          CurlsBot
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Analysis</Link>
          </li>
          <li>
            <details>
              <summary>Ingredients</summary>
              <ul className="p-2 bg-accent rounded-t-none">
                <li>
                  <Link
                    href="/ingredients-cheat-sheet"
                    onClick={handleLinkClick}
                  >
                    Cheat Sheet
                  </Link>
                </li>
                <li>
                  <Link href="/ingredients" onClick={handleLinkClick}>
                    All ingredients
                  </Link>
                </li>
                <li>
                  <Link href="/categories" onClick={handleLinkClick}>
                    Guides
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <details>
              <summary>Porosity</summary>
              <ul className="p-2 bg-accent rounded-t-none">
                <li>
                  <Link href="/porosity-quiz">Quiz</Link>
                </li>
                <li>
                  <Link
                    href="/porosity/high-porosity"
                    onClick={handleLinkClick}
                  >
                    High Porosity
                  </Link>
                </li>
                <li>
                  <Link href="/porosity/low-porosity" onClick={handleLinkClick}>
                    Low Porosity
                  </Link>
                </li>
                <li>
                  <Link
                    href="/porosity/normal-porosity"
                    onClick={handleLinkClick}
                  >
                    Normal Porosity
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary>More</summary>
              <ul className="p-2 bg-accent rounded-t-none">
                <li>
                  <Link href="/resources" onClick={handleLinkClick}>
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/about" onClick={handleLinkClick}>
                    About
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeToggle />
        <div
          ref={mobileMenuRef}
          onBlur={handleBlur}
          className="dropdown dropdown-end lg:hidden"
        >
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-accent rounded-box w-52"
          >
            <li>
              <Link href="/">Analysis</Link>
            </li>
            <li>
              <details>
                <summary>Ingredients</summary>
                <ul className="p-2 bg-accent rounded-t-none">
                  <li>
                    <Link
                      href="/ingredients-cheat-sheet"
                      onClick={handleLinkClick}
                    >
                      Cheat Sheet
                    </Link>
                  </li>
                  <li>
                    <Link href="/ingredients" onClick={handleLinkClick}>
                      All ingredients
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories" onClick={handleLinkClick}>
                      Guides
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <details>
                <summary>Porosity</summary>
                <ul className="p-2 bg-accent rounded-t-none">
                  <li>
                    <Link href="/porosity-quiz" onClick={handleLinkClick}>
                      Quiz
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/porosity/high-porosity"
                      onClick={handleLinkClick}
                    >
                      High Porosity
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/porosity/low-porosity"
                      onClick={handleLinkClick}
                    >
                      Low Porosity
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/porosity/normal-porosity"
                      onClick={handleLinkClick}
                    >
                      Normal Porosity
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>More</summary>
                <ul className="p-2 bg-accent rounded-t-none">
                  <li>
                    <Link href="/resources" onClick={handleLinkClick}>
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" onClick={handleLinkClick}>
                      About
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
