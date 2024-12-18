import { NextResponse } from 'next/server';
import { Analyzer } from '../../../../../src/analyzer';
import { getBundledSystems, getBundledSettings } from '../../../../../src/data/bundledData';
import type { AnalysisResult } from '@/types/analysis';

export async function POST(request: Request) {
  try {
    const { ingredients, systemId = 'curly_default', customSettings } = await request.json();

    if (!ingredients || typeof ingredients !== 'string') {
      return NextResponse.json(
        { error: 'Invalid ingredients list' },
        { status: 400 }
      );
    }

    // Create analyzer with default configuration
    const analyzer = new Analyzer();

    // Handle system selection
    if (systemId === 'custom') {
      if (!Array.isArray(customSettings) || customSettings.length === 0) {
        return NextResponse.json(
          { error: 'Custom system requires settings' },
          { status: 400 }
        );
      }

      // Create a custom system with the selected settings
      const customSystem = {
        id: 'custom',
        name: 'Custom System',
        description: 'User-defined system',
        settings: customSettings
      };

      analyzer.setSystem(customSystem);
    } else if (systemId !== 'curly_default') {
      const systems = getBundledSystems();
      const selectedSystem = systems.find(s => s.id === systemId);
      if (!selectedSystem) {
        return NextResponse.json(
          { error: 'Invalid system selected' },
          { status: 400 }
        );
      }
      analyzer.setSystem(selectedSystem);
    }

    // Analyze ingredients
    const analysisResult = analyzer.analyze(ingredients);

    // Convert the analysis result to our frontend format
    const result: AnalysisResult = {
      overallStatus: analysisResult.status === 'error' ? 'caution' : analysisResult.status,
      ingredients: analysisResult.ingredients.map(ingredient => ({
        name: ingredient.name,
        matched: !!ingredient.ingredient,
        status: ingredient.status,
        info: ingredient.ingredient?.description,
        reason: ingredient.reasons[0]?.reason
      }))
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze ingredients' },
      { status: 500 }
    );
  }
}
