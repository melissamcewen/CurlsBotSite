import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IngredientPage from '@/app/ingredients/[name]/page';
import CategoryPage from '@/app/categories/[name]/page';
import GroupPage from '@/app/groups/[name]/page';

// Mock the database with minimal data
jest.mock('haircare-ingredients-analyzer', () => ({
  getBundledDatabase: () => ({
    ingredients: {
      dimethicone: {
        id: 'dimethicone',
        name: 'Dimethicone',
        categories: ['silicones'],
        status: 'ok',
      },
    },
    categories: {
      silicones: {
        id: 'silicones',
        name: 'Silicones',
        group: 'others',
      },
      drying_alcohols: {
        id: 'drying_alcohols',
        name: 'Drying Alcohols',
        group: 'alcohols',
      },
    },
    groups: {
      others: {
        id: 'others',
        name: 'Others',
      },
      alcohols: {
        id: 'alcohols',
        name: 'Alcohols',
      },
    },
  }),
}));

// Mock the markdown content functions with minimal content
jest.mock('@/utils/markdown', () => ({
  getIngredientContent: () => ({
    content: 'Test ingredient content',
    frontmatter: {},
  }),
  getCategoryContent: () => ({
    content: 'Test category content',
    frontmatter: {},
  }),
  getGroupContent: () => ({
    content: 'Test group content',
    frontmatter: {},
  }),
}));

// Mock next navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({}),
  useSearchParams: () => ({ get: () => null }),
  usePathname: () => '',
}));

describe('Content Pages Smoke Tests', () => {
  it('ingredient page renders without crashing', async () => {
    const params = { name: 'dimethicone' };
    render(await IngredientPage({ params: Promise.resolve(params) }));
    expect(
      screen.getByRole('heading', { name: /Dimethicone/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it('category page renders without crashing', async () => {
    const params = { name: 'drying-alcohols' };
    render(await CategoryPage({ params: Promise.resolve(params) }));
    expect(
      screen.getByRole('heading', { name: /drying alcohols/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it('group page renders without crashing', async () => {
    const params = { name: 'alcohols' };
    render(await GroupPage({ params: Promise.resolve(params) }));
    expect(
      screen.getByRole('heading', { name: /alcohols/i, level: 1 }),
    ).toBeInTheDocument();
  });
});
