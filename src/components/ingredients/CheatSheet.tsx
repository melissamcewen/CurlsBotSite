import { ExclamationTriangleIcon, InformationCircleIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

export interface SourceItemProps {
  source: string;
  status: 'caution' | 'ok' | 'warning' | 'good';
  link?: string;
  description?: string;
}

export const SourceItem: React.FC<SourceItemProps> = ({ source, status, link, description }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'warning':
        return <ExclamationCircleIcon className="w-5 h-5 text-error" />;
      case 'caution':
        return <ExclamationTriangleIcon className="w-5 h-5 text-warning" />;
      case 'good':
        return <CheckCircleIcon className="w-5 h-5 text-success" />;
      case 'ok':
        return <InformationCircleIcon className="w-5 h-5 text-info" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'warning':
        return 'Avoid';
      case 'caution':
        return 'Caution';
      case 'good':
        return 'Good';
      case 'ok':
        return 'OK';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getStatusIcon()}
      <div className="flex items-center">
        {link ? (
          <a href={link} className="cb-link-emphasized" target="_blank" rel="noopener noreferrer">
            {source}
          </a>
        ): (
          <span>{source}</span>
        )}
        <span className="mx-1">:</span>
        <span>{description}</span>
      </div>
    </div>
  );
};

interface IngredientChipProps {
  name: string;
}

export const IngredientChip: React.FC<IngredientChipProps> = ({ name }) => (
  <div className="cb-badge  font-normal">{name}</div>
);

export interface IdentificationSectionProps {
  title: string;
  ingredients: string[];
}

export const IdentificationSection: React.FC<IdentificationSectionProps> = ({ title, ingredients }) => (
  <div className="space-y-2">
    <div className="cb-card-lite space-y-3 bg-base-100">
    <div className="">{title}</div>
    <div className="flex flex-wrap gap-2">
      {ingredients.map((ingredient) => (
        <IngredientChip key={ingredient} name={ingredient} />
      ))}
    </div>
    </div>
  </div>
);

export interface CheatSheetProps {
  title: string;
  description: string;
  sources: SourceItemProps[];
  identificationSections: IdentificationSectionProps[];
}

export const CheatSheet: React.FC<CheatSheetProps> = ({
  title,
  description,
  sources,
  identificationSections,
}) => {
  return (
    <div className="card bg-base-200 p-6 space-y-6">
      <div>
        <h2 className="cb-header">

          {title}</h2>
        <p className="">{description}</p>
      </div>

      <div className="space-y-2 " >
        <div className="cb-card-lite space-y-3 bg-base-100">
        <h3 className="cb-grouping-header">Sources</h3>
        <div className=" space-y-3">
          {sources.map((source, index) => (
            <SourceItem key={index} {...source} />
          ))}
        </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="cb-smaller-header">How to identify</h3>
        {identificationSections.map((section, index) => (
          <IdentificationSection key={index} {...section} />
        ))}
      </div>
    </div>
  );
};
