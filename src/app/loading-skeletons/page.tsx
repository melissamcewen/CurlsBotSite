import BlogLoading from '../blog/loading';
import IngredientsLoading from '../ingredients/loading';
import QuizLoading from '../porosity-quiz/loading';
import HomeLoading from '../page/loading';
import { Card, CardTitle } from '@/components/ui/Card';

export default function LoadingSkeletonsPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Loading Skeletons</h1>

      <Card>
        <CardTitle>Home Page Loading</CardTitle>
        <div className="mt-4">
          <HomeLoading />
        </div>
      </Card>

      <Card>
        <CardTitle>Blog Loading</CardTitle>
        <div className="mt-4">
          <BlogLoading />
        </div>
      </Card>

      <Card>
        <CardTitle>Ingredients Loading</CardTitle>
        <div className="mt-4">
          <IngredientsLoading />
        </div>
      </Card>

      <Card>
        <CardTitle>Quiz Loading</CardTitle>
        <div className="mt-4">
          <QuizLoading />
        </div>
      </Card>
    </div>
  );
}
