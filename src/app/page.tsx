import IngredientForm from '@/components/analysis/IngredientForm';

export default function Home() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Analyze Ingredients</h2>
            <p>
              Paste your product ingredients to get instant analysis and recommendations.
            </p>
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Smart Detection</h2>
            <p>
              Automatically identifies silicones, sulfates, and other ingredients that matter for your hair care routine.
            </p>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <IngredientForm />
        </div>
      </div>
    </div>
  );
}
