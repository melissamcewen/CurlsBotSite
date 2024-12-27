import {
  BookOpenIcon,
  BeakerIcon,
  ScissorsIcon,
} from '@heroicons/react/24/solid';

interface Reference {
  url: string;
  status?: string;
  title?: string;
  type?: string;
  description?: string;
}

interface ReferencesListProps {
  references: Reference[];
}

function getTypeIcon(type?: string) {
  switch (type?.toLowerCase()) {
    case 'author':
      return (
        <BookOpenIcon className="w-4 h-4 inline-block mr-2 flex-shrink-0" />
      );
    case 'science':
      return <BeakerIcon className="w-4 h-4 inline-block mr-2 flex-shrink-0" />;
    case 'hairpro':
      return (
        <ScissorsIcon className="w-4 h-4 inline-block mr-2 flex-shrink-0" />
      );
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

export function ReferencesList({ references }: ReferencesListProps) {
  // Sort references by status
  const sortedReferences = [...references].sort(
    (a, b) => getStatusPriority(a.status) - getStatusPriority(b.status),
  );

  if (sortedReferences.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">References</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Source</th>
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
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-primary"
                      >
                        {ref.title || 'Reference'}
                      </a>
                      {ref.description && (
                        <div className="text-xs text-base-content/70 mt-0.5">
                          {ref.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  {ref.status ? (
                    <span
                      className={`cb-badge ${
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
          <BookOpenIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Popular Author</span>
        </div>
        <div className="flex items-center">
          <BeakerIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Cosmetic Chemist</span>
        </div>
        <div className="flex items-center">
          <ScissorsIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Hair Professional</span>
        </div>
      </div>
    </div>
  );
}
