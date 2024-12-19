'use client';

import { useEffect, useState } from 'react';
import { getBundledSystems } from 'haircare-ingredients-analyzer';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';
import { ContentCard } from '@/components/ui/ContentCard';
import { notFound } from 'next/navigation';
import { getSystemContent } from '@/utils/markdown';

interface Props {
  params: {
    systemId: string;
  };
}

export default async function SystemPage({ params }: Props) {
  const systems = getBundledSystems();
  const system = systems.find(s => s.id === params.systemId);

  if (!system) {
    return notFound();
  }

  const content = await getSystemContent(params.systemId);

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>{system.name}</CardTitle>
        <CardContent>
          <p className="text-base-content/70 mb-6">
            {system.description}
          </p>
        </CardContent>
      </Card>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4">Rules and Settings</h2>
        <ul className="list-disc list-inside space-y-2">
          {system.settings.map((setting: string, index: number) => (
            <li key={index} className="text-base-content/70">
              {setting}
            </li>
          ))}
        </ul>
      </ContentCard>

      {content && (
        <ContentCard>
          <div
            className="prose prose-base-content max-w-none"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </ContentCard>
      )}

      {!content && (
        <ContentCard>
          <h2 className="text-2xl font-bold mb-4">How This System Works</h2>
          <p className="text-base-content/70">
            This system analyzes ingredients based on the rules above. It looks for specific ingredients
            and patterns that match these criteria to determine if a product is suitable for your hair.
          </p>
          <p className="text-base-content/70 mt-4">
            When analyzing ingredients, the system will mark them as:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2 text-base-content/70">
            <li>✅ Good - Ingredients that are beneficial or safe</li>
            <li>⚠️ Caution - Ingredients that might be problematic for some people</li>
            <li>❌ Avoid - Ingredients that should generally be avoided</li>
          </ul>
        </ContentCard>
      )}
    </div>
  );
}
