'use client';

import { useState, useEffect } from 'react';
import { getBundledSettings } from 'haircare-ingredients-analyzer';

interface CustomSystemFormProps {
  onSave: (settings: string[]) => void;
  initialSettings: string[];
}

interface SettingGroup {
  name: string;
  description?: string;
  settings: Array<{
    id: string;
    name: string;
    description: string;
    categories?: string[];
    groups?: string[];
  }>;
}

export default function CustomSystemForm({
  onSave,
  initialSettings,
}: CustomSystemFormProps) {
  const [selectedSettings, setSelectedSettings] =
    useState<string[]>(initialSettings);
  const [settingGroups, setSettingGroups] = useState<SettingGroup[]>([]);

  useEffect(() => {
    const settings = getBundledSettings();

    // Create groups based on setting types
    const groups: Record<string, SettingGroup> = {
      Detergents: {
        name: 'Detergents',
        description: 'Control which types of cleansing agents are allowed',
        settings: [],
      },
      Silicones: {
        name: 'Silicones',
        description: 'Manage silicone-related ingredients',
        settings: [],
      },
      Alcohols: {
        name: 'Alcohols',
        description: 'Control different types of alcohols',
        settings: [],
      },
      Other: {
        name: 'Other Ingredients',
        description: 'Additional ingredient controls',
        settings: [],
      },
    };

    // Sort settings into appropriate groups
    Object.entries(settings).forEach(([id, setting]) => {
      const settingData = {
        id,
        name: setting.name,
        description: setting.description || '',
        categories: setting.categories,
        groups: setting.groups,
      };

      // Determine which group this setting belongs to
      if (id.includes('sulfate') || id.includes('detergent')) {
        groups['Detergents'].settings.push(settingData);
      } else if (id.includes('silicone')) {
        groups['Silicones'].settings.push(settingData);
      } else if (id.includes('alcohol')) {
        groups['Alcohols'].settings.push(settingData);
      } else {
        groups['Other'].settings.push(settingData);
      }
    });

    // Filter out empty groups and sort settings within each group
    const filteredGroups = Object.values(groups)
      .filter((group) => group.settings.length > 0)
      .map((group) => ({
        ...group,
        settings: group.settings.sort((a, b) => a.name.localeCompare(b.name)),
      }));

    setSettingGroups(filteredGroups);
  }, []);

  useEffect(() => {
    setSelectedSettings(initialSettings);
  }, [initialSettings]);

  const handleSettingToggle = (settingId: string) => {
    const newSettings = selectedSettings.includes(settingId)
      ? selectedSettings.filter((id) => id !== settingId)
      : [...selectedSettings, settingId];

    setSelectedSettings(newSettings);
    onSave(newSettings);
  };

  return (
    <div className="space-y-4">
      <div className="text-base-content mb-4">
        <h3 className="text-lg font-semibold mb-2">
          Customize Your Analysis System
        </h3>
        <p className="text-sm text-base-content/70">
          Select the settings you want to include in your custom analysis
          system.
        </p>
      </div>
      {settingGroups.map((group) => (
        <div
          key={group.name}
          className="collapse collapse-plus bg-base-100 border border-base-300 rounded-xl "
        >
          <input type="checkbox" defaultChecked={false} />
          <div className="collapse-title text-xl font-medium flex justify-between items-center text-base-content">
            <div>
              {group.name}
              <div className="text-sm font-normal text-base-content/70">
                {
                  group.settings.filter((s) => selectedSettings.includes(s.id))
                    .length
                }{' '}
                selected
              </div>
            </div>
          </div>
          <div className="collapse-content">
            {group.description && (
              <p className="text-sm text-base-content/70 mb-4">
                {group.description}
              </p>
            )}
            <div className="space-y-3">
              {group.settings.map((setting) => (
                <div
                  key={setting.id}
                  className="bg-base-200 p-4 rounded-lg border border-base-300"
                >
                  <label className="label cursor-pointer justify-start gap-4">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={selectedSettings.includes(setting.id)}
                      onChange={() => handleSettingToggle(setting.id)}
                    />
                    <div className="flex-1">
                      <span className="label-text font-medium text-base-content">
                        {setting.name}
                      </span>
                      {setting.description && (
                        <p className="text-sm text-base-content/70 mt-1">
                          {setting.description}
                        </p>
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
