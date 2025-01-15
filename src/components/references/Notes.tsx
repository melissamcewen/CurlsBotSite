import { BookOpen, FlaskConical, Scissors, Factory } from 'lucide-react';
/// please note these are not the same references as those used for categories and groups
import { Reference } from 'haircare-ingredients-analyzer';

interface ReferencesListProps {
  references: Reference[];
}

function getTypeIcon(type?: string) {
  switch (type?.toLowerCase()) {
    case 'author':
      return <BookOpen className="w-4 h-4 inline-block mr-2 flex-shrink-0" />;
    case 'science':
      return (
        <FlaskConical className="w-4 h-4 inline-block mr-2 flex-shrink-0" />
      );
    case 'hairpro':
      return <Scissors className="w-4 h-4 inline-block mr-2 flex-shrink-0" />;
    case 'industry':
      return <Factory className="w-4 h-4 inline-block mr-2 flex-shrink-0" />;
    default:
      return null;
  }
}

// Status priority order for sorting
function getStatusPriority(status?: string) {
  switch (status) {
    case 'good':
      return 1;
    case 'ok':
      return 2;
    case 'caution':
      return 3;
    case 'warning':
      return 4;
    default:
      return 5;
  }
}

export function Notes({ references }: ReferencesListProps) {
  // Sort references by status
  const sortedReferences = [...references].sort(
    (a, b) => getStatusPriority(a.status) - getStatusPriority(b.status),
  );

  if (sortedReferences.length === 0) {
    return null;
  }
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Notes</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full bg-base-100">
          <thead>
            <tr>
              <th>Source</th>
              <th>Notes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedReferences.map((ref, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center">
                    {getTypeIcon(ref.type)}
                    <div>
                      {ref.author && <span>{ref.author}</span>}
                      {ref.date && <span> ({ref.date}) </span>}
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        {ref.title || 'Reference'}
                      </a>
                      {ref.source && <span> {ref.source} </span>}
                    </div>
                  </div>
                </td>
                <td>{ref.description}</td>
                <td>
                  {ref.status ? (
                    <span
                      className={`badge ${
                        ref.status === 'good'
                          ? 'badge-success'
                          : ref.status === 'warning'
                          ? 'badge-error'
                          : ref.status === 'caution'
                          ? 'badge-warning'
                          : ref.status === 'ok'
                          ? 'badge-info'
                          : 'badge-ghost'
                      }`}
                    >
                      {ref.status}
                    </span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-base-content/70">
        <div className="flex items-center">
          <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Popular Author</span>
        </div>
        <div className="flex items-center">
          <FlaskConical className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Cosmetic Chemist</span>
        </div>
        <div className="flex items-center">
          <Scissors className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Hair Professional</span>
        </div>
      </div>
    </div>
  );
}
