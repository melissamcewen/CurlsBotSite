import { ReactNode } from 'react';

interface CheatSheetCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  warning?: boolean;
}

export function CheatSheetCard({ title, icon, children, warning }: CheatSheetCardProps) {
  return (
    <div className="bg-base-100 rounded-box p-6 space-y-6 cb-border">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="cb-smaller-header">{title}</h2>
        </div>
        {warning && (
          <div className="badge badge-warning cb-badge">
            Caution
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
  return (
    <div className={`flex gap-2 p-4 rounded-lg ${type === 'warning' ? 'bg-warning/10' : 'bg-info/10'} text-sm`}>
      {type === 'warning' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-warning shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )}
      <span className="text-base-content">{children}</span>
    </div>
  );
}

interface CheatSheetPatternProps {
  children: ReactNode;
}

export function CheatSheetPattern({ children }: CheatSheetPatternProps) {
  return (
    <li className="flex items-center gap-2">
      <svg
        className="w-4 h-4 text-success flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <code className="bg-base-200 px-1.5 py-0.5 rounded text-sm font-medium">{children}</code>
    </li>
  );
}
