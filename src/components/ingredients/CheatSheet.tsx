import { AlertTriangle, Info, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export interface SourceItemProps {
  source: string;
  status: 'caution' | 'ok' | 'warning' | 'good';
  link?: string;
  description?: string;
}

export const SourceItem: React.FC<SourceItemProps> = ({
  source,
  status,
  link,
  description,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 flex-shrink-0 text-error" />;
      case 'caution':
        return <AlertTriangle className="w-5 h-5 flex-shrink-0 text-warning" />;
      case 'good':
        return <CheckCircle className="w-5 h-5 flex-shrink-0 text-success" />;
      case 'ok':
        return <Info className="w-5 h-5 flex-shrink-0 text-info" />;
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
      <div className="flex-shrink-0">{getStatusIcon()}</div>
      <div className="flex items-center flex-wrap">
        {link ? (
          <a
            href={link}
            className="cb-link-emphasized"
            target="_blank"
            rel="noopener noreferrer"
          >
            {source}
          </a>
        ) : (
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
  <div className="badge  font-normal">{name}</div>
);

export interface IdentificationSectionProps {
  title: string;
  ingredients: string[];
  status?: 'caution' | 'ok' | 'warning' | 'good';
}

export const IdentificationSection: React.FC<IdentificationSectionProps> = ({
  title,
  ingredients,
  status,
}) => {
  const getStatusIcon = () => {
    if (!status) return null;
    switch (status) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 flex-shrink-0 text-error" />;
      case 'caution':
        return <AlertTriangle className="w-5 h-5 flex-shrink-0 text-warning" />;
      case 'good':
        return <CheckCircle className="w-5 h-5 flex-shrink-0 text-success" />;
      case 'ok':
        return <Info className="w-5 h-5 flex-shrink-0 text-info" />;
      default:
        return null;
    }
  };

  const getBorderColorClass = () => {
    if (!status) return 'border-primary bg-primary/10';
    switch (status) {
      case 'warning':
        return 'border-error bg-error/10';
      case 'caution':
        return 'border-warning bg-warning/10';
      case 'good':
        return 'border-success bg-success/10';
      case 'ok':
        return 'border-info bg-info/10';
      default:
        return 'border-secondary bg-secondary/10';
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={`cb-card-lite space-y-3 cb-border ${getBorderColorClass()}`}
      >
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <div>{title}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient) => (
            <IngredientChip key={ingredient} name={ingredient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export interface CheatSheetProps {
  title: string;
  description: string;
  sources: SourceItemProps[];
  identificationSections: IdentificationSectionProps[];
  exceptionsSections?: IdentificationSectionProps[];
  exceptionsDescription?: string;
  titleURL?: string;
}

export const CheatSheet: React.FC<CheatSheetProps> = ({
  title,
  description,
  sources,
  identificationSections,
  exceptionsSections,
  exceptionsDescription,
  titleURL,
}) => {
  return (
    <div className="card bg-base-100 p-6 space-y-6">
      <div>
        <h2 className="cb-header">
          {titleURL ? (
            <Link href={titleURL} className="cb-link-emphasized">
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="">{description}</p>
      </div>

      <div className="space-y-2 ">
        <div className="cb-card-lite space-y-3 cb-border border-primary bg-primary/10">
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
      {exceptionsSections && (
        <div className="space-y-4">
          <h3 className="cb-smaller-header">Exceptions</h3>
          <p className="">{exceptionsDescription}</p>
          {exceptionsSections.map((section, index) => (
            <IdentificationSection key={index} {...section} />
          ))}
        </div>
      )}
    </div>
  );
};
