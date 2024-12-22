import { ReactNode } from 'react';
import { BookOpenIcon } from '@heroicons/react/24/solid';

interface CheatSheetCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  status?: 'caution' | 'warning' | 'ok';
}

export function CheatSheetCard({ title, icon, children, status }: CheatSheetCardProps) {
  const getBadgeClass = () => {
    switch (status) {
      case 'caution': return 'badge-warning';
      case 'warning': return 'badge-error';
      case 'ok': return 'badge-info';
      default: return '';
    }
  };

  const getBadgeText = () => {
    switch (status) {
      case 'caution': return 'Caution';
      case 'warning': return 'Warning';
      case 'ok': return 'OK';
      default: return '';
    }
  };

  return (
    <div className="bg-base-100 rounded-box p-6 space-y-6 cb-border">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="cb-smaller-header">{title}</h2>
        </div>
        {status && status !== 'ok' && (
          <div className={`badge ${getBadgeClass()} cb-badge`}>
            {getBadgeText()}
          </div>
        )}
      </div>

      {children}
    </div>
  );
}

interface CheatSheetAlertProps {
  type: 'warning' | 'info';
  children: ReactNode;
}

export function CheatSheetAlert({ type, children }: CheatSheetAlertProps) {
  const alertClass = type === 'warning' ? 'bg-warning/10' : 'bg-info/10';
  const iconClass = type === 'warning' ? 'stroke-warning' : 'stroke-info';

  return (
    <div className={`flex gap-2 p-4 rounded-lg ${alertClass} text-sm`}>
      {type === 'warning' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${iconClass} shrink-0 h-5 w-5`} fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={`${iconClass} shrink-0 w-5 h-5`}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )}
      <div className="text-base-content">{children}</div>
    </div>
  );
}

interface CheatSheetSourceItemProps {
  type: 'info' | 'warning' | 'caution' | 'error';
  source: string;
  stance: string;
  href?: string;
}

export function CheatSheetSourceItem({ type, source, stance, href }: CheatSheetSourceItemProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'info':
        return { color: 'text-info' };
      case 'warning':
        return { color: 'text-warning' };
      case 'caution':
      case 'error':
        return { color: 'text-error' };
    }
  };

  const styles = getTypeStyles();
  const sourceText = href ? (
    <a href={href} className="link hover:underline">
      {source}
    </a>
  ) : (
    <span>{source}</span>
  );

  return (
    <div className="flex items-center gap-2">
      <BookOpenIcon className={`${styles.color} h-5 w-5`} />
      <span className="text-base-content">
        {sourceText}: <span className="font-medium">{stance}</span>
      </span>
    </div>
  );
}

interface CheatSheetSourceListProps {
  children: ReactNode;
}

export function CheatSheetSourceList({ children }: CheatSheetSourceListProps) {
  return (
    <div className="mb-4">
      <h3 className="text-base-content/70 font-bold mb-2">Sources:</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

interface CheatSheetPatternProps {
  pattern: string;
  example?: string;
}

export function CheatSheetPattern({ pattern, example }: CheatSheetPatternProps) {
  return (
    <div className="bg-base-200/50 rounded-lg p-3">
      <div className="font-medium">{pattern}</div>
      {example && (
        <div className="text-base-content/60 text-sm">
         Examples: {example}
        </div>
      )}
    </div>
  );
}

interface CheatSheetPatternGroupProps {
  children: ReactNode;
  title?: string;
}

export function CheatSheetPatternGroup({ children, title }: CheatSheetPatternGroupProps) {
  return (
    <div className="space-y-2">
      {title && (
        <div className="text-base-content/70 font-semibold">
          {title}
        </div>
      )}
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}
