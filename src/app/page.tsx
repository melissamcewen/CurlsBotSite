import IngredientForm from '@/components/analysis/IngredientForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero bg-base-100 py-12">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">CurlsBot</h1>
            <p className="py-6 text-xl">
              Your intelligent assistant for analyzing hair care ingredients
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Analyze Ingredients</h2>
              <p>
                Paste your product ingredients to get instant analysis and recommendations.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Smart Detection</h2>
              <p>
                Automatically identifies silicones, sulfates, and other ingredients that matter for your hair care routine.
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <IngredientForm />
          </div>
        </div>
      </main>
    </div>
  );
}
