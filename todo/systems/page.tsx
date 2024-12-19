import { getBundledSystems } from 'haircare-ingredients-analyzer';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function SystemsPage() {
  const systems = getBundledSystems();

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>Analysis Systems</CardTitle>
        <CardContent>
          <p className="text-base-content/70 mb-6">
            Choose the right analysis system for your hair type and needs. Each system has its own set of rules
            and criteria for evaluating ingredients.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {systems.map(system => (
          <Link
            key={system.id}
            href={`/systems/${system.id}`}
            className="card bg-base-200 hover:bg-base-300 transition-colors"
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title">{system.name}</h2>
                <ArrowRightIcon className="w-5 h-5" />
              </div>
              <p className="text-base-content/70">{system.description}</p>
              <div className="mt-4">
                <div className="badge badge-primary">
                  {system.settings.length} rules
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Card>
        <CardContent className="text-center text-base-content/70">
          <p>
            Not sure which system to choose? Start with the Default Curly Hair System and adjust based on your results.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
