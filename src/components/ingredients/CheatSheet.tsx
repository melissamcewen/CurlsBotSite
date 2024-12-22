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
        return <ExclamationCircleIcon className="w-4 h-4 text-error" />;
      case 'caution':
        return <ExclamationTriangleIcon className="w-4 h-4 text-warning" />;
      case 'good':
        return <CheckCircleIcon className="w-4 h-4 text-success" />;
      case 'ok':
        return <InformationCircleIcon className="w-4 h-4 text-info" />;
      default:
        return null;
    }
  };

  const content = (
    <div className="flex items-center gap-2">
      {getStatusIcon()}
      <span>{source}</span>
      <span className="text-sm capitalize">
        {description}
      </span>
    </div>
  );

  return link ? (
    <a href={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};

interface IngredientChipProps {
  name: string;
}

export const IngredientChip: React.FC<IngredientChipProps> = ({ name }) => (
  <div className="badge badge-neutral badge-lg rounded-full font-normal">{name}</div>
);

export interface IdentificationSectionProps {
  title: string;
  ingredients: string[];
}

export const IdentificationSection: React.FC<IdentificationSectionProps> = ({ title, ingredients }) => (
  <div className="space-y-2">
    <div className="text-sm">{title}</div>
    <div className="flex flex-wrap gap-2">
      {ingredients.map((ingredient) => (
        <IngredientChip key={ingredient} name={ingredient} />
      ))}
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
    <div className="card bg-base-100 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Sources</h3>
        <div className="space-y-1">
          {sources.map((source, index) => (
            <SourceItem key={index} {...source} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">How to identify</h3>
        {identificationSections.map((section, index) => (
          <IdentificationSection key={index} {...section} />
        ))}
      </div>
    </div>
  );
};
