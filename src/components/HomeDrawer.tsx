'use client';

import { ReactNode, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { ChevronLeft, ChevronDown } from 'lucide-react';

interface Props {
  children: ReactNode;
  hasIngredients: boolean;
}

export default function HomeDrawer({ children, hasIngredients }: Props) {
  // Initialize from localStorage if available, otherwise use hasIngredients
  const [isOpen, setIsOpen] = useState(() => {
    // Only run this on client side
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarOpen');
      if (saved !== null) {
        return saved === 'true';
      }
    }
    return !hasIngredients;
  });

  // Only update based on hasIngredients if localStorage doesn't have a value
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarOpen');
      if (saved === null && hasIngredients) {
        setIsOpen(false);
      }
    }
  }, [hasIngredients]);

  // Save to localStorage whenever state changes
  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('sidebarOpen', String(newState));
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative flex">
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-in-out
            ${
              isOpen
                ? 'max-h-[1000px] md:max-h-none md:w-80'
                : 'max-h-0 md:max-h-none md:w-0'
            }
          `}
        >
          <div className=" w-full md:w-80">
            <Sidebar />
          </div>
        </div>
        <button
          onClick={handleToggle}
          className="btn btn-circle btn-sm absolute top-2 right-2 md:relative md:right-auto md:top-4 md:-ml-3 z-20 bg-base-100"
        >
          <span className="block md:hidden">
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </span>
          <span className="hidden md:block">
            <ChevronLeft
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? '' : 'rotate-180'
              }`}
            />
          </span>
        </button>
      </div>
      <div className="flex-1 p-0 md:p-8">{children}</div>
    </div>
  );
}
