'use client';

import { useEffect, useState } from 'react';
import { getBundledSystems } from 'haircare-ingredients-analyzer';
import CustomSystemForm from './CustomSystemForm';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface System {
  id: string;
  name: string;
  description?: string;
  settings: string[];
}

interface SystemSelectorProps {
  value: string;
  onChange: (systemId: string, customSettings?: string[]) => void;
}

export default function SystemSelector({ value, onChange }: SystemSelectorProps) {
  const [systems, setSystems] = useState<System[]>([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [defaultSettings, setDefaultSettings] = useState<string[]>([]);

  useEffect(() => {
    // Load systems on component mount
    const bundledSystems = getBundledSystems();
    setSystems(bundledSystems);

    // Get default system settings
    const defaultSystem = bundledSystems.find(s => s.id === 'curly_default');
    if (defaultSystem) {
      setDefaultSettings(defaultSystem.settings);
    }
  }, []);

  const handleSystemChange = (newValue: string) => {
    if (newValue === 'custom') {
      setShowCustomForm(true);
      // Initialize custom settings with the current system's settings
      const currentSystem = systems.find(s => s.id === value);
      onChange('custom', currentSystem?.settings || defaultSettings);
    } else {
      setShowCustomForm(false);
      onChange(newValue);
    }
  };

  const handleCustomSettings = (settings: string[]) => {
    onChange('custom', settings);
  };

  const currentSystem = systems.find(s => s.id === value);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
          <label className="font-medium">Analysis System</label>
        </div>
        <select
          className="select select-bordered bg-base-200 text-base-content w-full"
          value={value}
          onChange={(e) => handleSystemChange(e.target.value)}
        >
          {systems.map(system => (
            <option key={system.id} value={system.id}>
              {system.name}
            </option>
          ))}
          <option value="custom">Custom System</option>
        </select>
        {value !== 'custom' && currentSystem?.description && (
          <p className="text-sm text-base-content/70">
            {currentSystem.description}
          </p>
        )}
      </div>

      {showCustomForm && (
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            <CustomSystemForm
              onSave={handleCustomSettings}
              initialSettings={systems.find(s => s.id === value)?.settings || defaultSettings}
            />
          </div>
        </div>
      )}
    </div>
  );
}
