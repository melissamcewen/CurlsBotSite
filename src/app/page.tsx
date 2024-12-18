import IngredientForm from '@/components/analysis/IngredientForm';

export default function Home() {
  return (
    <div>
      <div className="card bg-base-100 rounded-box shadow-lg p-6">
        <div className="card-body">
          <IngredientForm />
        </div>
      </div>
    </div>
  );
}
