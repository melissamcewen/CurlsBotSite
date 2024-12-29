import HomeLoading from '../(home)/loading';
import BlogLoading from '../blog/loading';
import IngredientsLoading from '../ingredients/loading';
import DefaultLoading from '../loading';

export default function SkeletonsPreview() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Default Loading State</h2>
        <DefaultLoading />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Home Page Loading State</h2>
        <HomeLoading />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Blog Loading State</h2>
        <BlogLoading />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Ingredients Loading State</h2>
        <IngredientsLoading />
      </section>
    </div>
  );
}
