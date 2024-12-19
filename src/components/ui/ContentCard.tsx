interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentCard({ children, className = '' }: ContentCardProps) {
  return (
    <div className={`bg-base-100 rounded-lg p-6 border border-base-300 shadow-lg ${className}`}>
      {children}
    </div>
  );
}
