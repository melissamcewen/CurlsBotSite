import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getBundledDatabase,
  type Category,
  type Ingredient,
} from 'haircare-ingredients-analyzer';
import type { ReferenceUsage } from '@/types/references';

import { getIngredientContent } from '@/utils/markdown';
import { IngredientDetailsCard } from '@/components/ingredients/IngredientDetailsCard';
import { Notes } from '@/components/references/Notes';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { slugToId, idToSlug } from '@/utils/slugs';
import { createDynamicPageMetadata } from '@/config/metadata';

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);
  const ingredientId = slugToId(decodedName);
  const database = getBundledDatabase();

  // Find the ingredient - exact match first, then case-insensitive
  let dbIngredientId = Object.keys(database.ingredients).find(
    (id) => id === ingredientId,
  );

  // If no exact match, try case-insensitive
  if (!dbIngredientId) {
    dbIngredientId = Object.keys(database.ingredients).find(
      (id) => id.toLowerCase() === ingredientId.toLowerCase(),
    );
  }

  if (!dbIngredientId) {
    notFound();
  }

  const ingredient = database.ingredients[dbIngredientId];
  const markdownContent = await getIngredientContent(idToSlug(dbIngredientId));

  return createDynamicPageMetadata({
    title:
      markdownContent?.frontmatter?.title ||
      ingredient.name + ' and curly/wavy hair guide',
    description:
      markdownContent?.frontmatter?.description ||
      ingredient.description ||
      `Learn about ${ingredient.name} in hair care products and its effects on curly and wavy hair.`,
    path: `/ingredients/${resolvedParams.name}`,
    hasContent: !!markdownContent,
    imageAlt: `${ingredient.name} - Hair Care Ingredient`,
  });
}

export default async function IngredientPage({ params }: PageProps) {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);
  const ingredientId = slugToId(decodedName);
  const database = getBundledDatabase();

  // Find the ingredient - exact match first, then case-insensitive
  let dbIngredientId = Object.keys(database.ingredients).find(
    (id) => id === ingredientId,
  );

  // If no exact match, try case-insensitive
  if (!dbIngredientId) {
    dbIngredientId = Object.keys(database.ingredients).find(
      (id) => id.toLowerCase() === ingredientId.toLowerCase(),
    );
  }

  if (!dbIngredientId) {
    notFound();
  }

  const ingredient = database.ingredients[dbIngredientId];

  // Try to get markdown content
  const markdownContent = await getIngredientContent(idToSlug(dbIngredientId));

  // Build breadcrumbs
  const breadcrumbs = [{ href: '/ingredients', label: 'Ingredients' }];

  // Add category and group if they exist
  if (ingredient.categories && ingredient.categories.length > 0) {
    const categoryId = ingredient.categories[0];
    const category = database.categories[categoryId];
    if (category) {
      if (category.group) {
        const group = database.groups[category.group];
        if (group) {
          breadcrumbs.unshift({ href: '/categories', label: 'Groups' });
          breadcrumbs.push({
            href: `/groups/${idToSlug(category.group)}`,
            label: group.name,
          });
        }
      }
      breadcrumbs.push({
        href: `/categories/${idToSlug(categoryId)}`,
        label: category.name,
      });
    }
  }

  breadcrumbs.push({
    href: `/ingredients/${resolvedParams.name}`,
    label: ingredient.name,
  });
  console.log(ingredient);
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-6">
        {/* Ingredient Information */}
        <div className="text-base-content">
          <div className="">
            {markdownContent ? (
              <div
                className="prose prose-base mt-4 max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownContent.content }}
              />
            ) : (
              <IngredientDetailsCard
                name={ingredient.name}
                description={ingredient.description}
                categories={ingredient.categories}
                synonyms={ingredient.synonyms}
                categoryNames={database.categories}
                groupNames={database.groups}
              />
            )}

            {/* References */}
            {ingredient.references && (
              <Notes references={ingredient.references} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
