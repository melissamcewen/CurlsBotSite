import { proteinAnalysis } from '@/lib/proteinAnalysis';
import type { AnalysisResult } from 'haircare-ingredients-analyzer';

function mockAnalysis(
  ingredients: AnalysisResult['ingredients'],
): AnalysisResult {
  return {
    input: '',
    status: 'ok',
    reasons: [],
    ingredients,
  };
}

describe('proteinAnalysis', () => {
  it('returns protein matches with label position', () => {
    const result = proteinAnalysis(
      mockAnalysis([
        {
          name: 'Water',
          normalized: 'water',
          status: 'ok',
          reasons: [],
          ingredient: {
            id: 'water',
            name: 'Water',
            categories: ['other'],
          },
        },
        {
          name: 'Hydrolyzed Wheat Protein',
          normalized: 'hydrolyzed wheat protein',
          status: 'ok',
          reasons: [],
          ingredient: {
            id: 'hydrolyzed_wheat_protein',
            name: 'Hydrolyzed Wheat Protein',
            categories: ['proteins'],
            description: 'Acts like a hybrid between a film-forming humectant and a protein',
          },
        },
      ]),
    );

    expect(result.hasProteins).toBe(true);
    expect(result.matches).toHaveLength(1);
    expect(result.matches[0].kind).toBe('protein');
    expect(result.matches[0].position).toBe(2);
    expect(result.matches[0].description).toBe(
      'Acts like a hybrid between a film-forming humectant and a protein',
    );
  });

  it('classifies amino acids separately from proteins', () => {
    const result = proteinAnalysis(
      mockAnalysis([
        {
          name: 'Silk Amino Acids',
          normalized: 'silk amino acids',
          status: 'ok',
          reasons: [],
          ingredient: {
            id: 'silk_amino_acids',
            name: 'Silk Amino Acids',
            categories: ['amino_acids'],
          },
        },
      ]),
    );

    expect(result.hasProteins).toBe(false);
    expect(result.hasAminoAcids).toBe(true);
    expect(result.matches[0].kind).toBe('amino_acid');
  });

  it('returns empty matches when no protein-related categories', () => {
    const result = proteinAnalysis(
      mockAnalysis([
        {
          name: 'Glycerin',
          normalized: 'glycerin',
          status: 'ok',
          reasons: [],
          ingredient: {
            id: 'glycerin',
            name: 'Glycerin',
            categories: ['simple_humectants'],
          },
        },
      ]),
    );

    expect(result.matches).toHaveLength(0);
    expect(result.hasProteins).toBe(false);
    expect(result.hasAminoAcids).toBe(false);
  });
});
