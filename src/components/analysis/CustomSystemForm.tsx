'use client';

import { useState, useEffect } from 'react';
import { getBundledSettings } from '../../../../src/data/bundledData';

interface Setting {
  id: string;
  name: string;
  description: string;
  categories?: string[];
  groups?: string[];
  allowedCategories?: string[];
  ingredients?: string[];
}

interface GroupedSettings {
  groupBased: Setting[];
  categoryBased: Setting[];
  ingredientBased: Setting[];
  mixed: Setting[];
}

interface CustomSystemFormProps {
  onSave: (settings: string[]) => void;
  initialSettings?: string[];
}

const GROUP_DESCRIPTIONS = {
  groupBased: "Rules that apply to entire groups of ingredients (e.g., all silicones, all alcohols)",
  categoryBased: "Rules that apply to specific categories within groups (e.g., drying alcohols, mild detergents)",
  ingredientBased: "Rules that check for specific ingredients",
  mixed: "Rules that combine multiple types of checks"
};

export default function CustomSystemForm({ onSave, initialSettings = [] }: CustomSystemFormProps) {
  const [groupedSettings, setGroupedSettings] = useState<GroupedSettings>({
    groupBased: [],
    categoryBased: [],
    ingredientBased: [],
    mixed: []
  });
  const [selectedSettings, setSelectedSettings] = useState<Set<string>>(new Set(initialSettings));

  useEffect(() => {
    // Convert settings object to array and group by type
    const allSettings = Object.entries(getBundledSettings()).map(([id, setting]) => ({
      id,
      name: setting.name,
      description: setting.description,
      categories: setting.categories,
      groups: setting.groups,
      allowedCategories: setting.allowedCategories,
      ingredients: setting.ingredients
    }));

    const grouped = allSettings.reduce<GroupedSettings>(
      (acc, setting) => {
        const hasCategories = !!setting.categories?.length;
        const hasGroups = !!setting.groups?.length;
        const hasIngredients = !!setting.ingredients?.length;

        if (hasCategories && !hasGroups && !hasIngredients) {
          acc.categoryBased.push(setting);
        } else if (hasGroups && !hasCategories && !hasIngredients) {
          acc.groupBased.push(setting);
        } else if (hasIngredients && !hasCategories && !hasGroups) {
          acc.ingredientBased.push(setting);
        } else {
          acc.mixed.push(setting);
        }
        return acc;
      },
      { groupBased: [], categoryBased: [], ingredientBased: [], mixed: [] }
    );

    // Sort settings within each group
    Object.keys(grouped).forEach(key => {
      grouped[key as keyof GroupedSettings].sort((a, b) => a.name.localeCompare(b.name));
    });

    setGroupedSettings(grouped);
  }, []);

  // Update selected settings when initialSettings changes
  useEffect(() => {
    setSelectedSettings(new Set(initialSettings));
  }, [initialSettings]);

  const handleToggle = (settingId: string) => {
    const newSelected = new Set(selectedSettings);
    if (newSelected.has(settingId)) {
      newSelected.delete(settingId);
    } else {
      newSelected.add(settingId);
    }
    setSelectedSettings(newSelected);
    onSave(Array.from(newSelected));
  };

  const DetailsList = ({ title, items }: { title: string; items?: string[] }) => {
    if (!items?.length) return null;
    return (
      <div className="mt-2">
        <span className="text-sm font-medium">{title}: </span>
        <span className="text-sm opacity-70">{items.join(', ')}</span>
      </div>
    );
  };

  const SettingCard = ({ setting }: { setting: Setting }) => (
    <div className="card bg-base-200">
      <div className="card-body p-4">
        <div className="flex items-center gap-4">
          <label className="label cursor-pointer flex items-center gap-4">
            <input
              type="checkbox"
              className="checkbox"
              checked={selectedSettings.has(setting.id)}
              onChange={() => handleToggle(setting.id)}
            />
            <span className="label-text font-medium">{setting.name}</span>
          </label>
        </div>
        {setting.description && (
          <p className="text-sm opacity-70 mt-1">
            {setting.description}
          </p>
        )}
        <div className="mt-2 space-y-1">
          <DetailsList title="Groups" items={setting.groups} />
          <DetailsList title="Categories" items={setting.categories} />
          <DetailsList title="Allowed Categories" items={setting.allowedCategories} />
          {setting.ingredients && setting.ingredients.length > 0 && (
            <div className="mt-2">
              <span className="text-sm font-medium">Ingredients: </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {setting.ingredients.map((ingredient, index) => (
                  <span key={index} className="badge badge-sm">{ingredient}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const SettingGroup = ({ title, type, settings }: { title: string, type: keyof GroupedSettings, settings: Setting[] }) => {
    const selectedCount = settings.filter(setting => selectedSettings.has(setting.id)).length;
    const totalCount = settings.length;

    return settings.length > 0 && (
      <div className="collapse collapse-arrow bg-base-100">
        <input type="checkbox" className="peer" />
        <div className="collapse-title">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-lg">{title}</h3>
              <p className="text-sm opacity-70">{GROUP_DESCRIPTIONS[type]}</p>
            </div>
            <div className="badge badge-neutral">
              {selectedCount}/{totalCount} selected
            </div>
          </div>
        </div>
        <div className="collapse-content">
          <div className="pt-4 grid gap-2">
            {settings.map(setting => (
              <SettingCard key={setting.id} setting={setting} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Customize your analysis rules. Starting with the settings from {initialSettings.length > 0 ? 'the selected system' : 'Curly Default'}. Click each section to expand.</span>
      </div>

      <div className="space-y-4">
        <SettingGroup title="Group-Based Rules" type="groupBased" settings={groupedSettings.groupBased} />
        <SettingGroup title="Category-Based Rules" type="categoryBased" settings={groupedSettings.categoryBased} />
        <SettingGroup title="Ingredient-Based Rules" type="ingredientBased" settings={groupedSettings.ingredientBased} />
        <SettingGroup title="Combined Rules" type="mixed" settings={groupedSettings.mixed} />
      </div>
    </div>
  );
}
