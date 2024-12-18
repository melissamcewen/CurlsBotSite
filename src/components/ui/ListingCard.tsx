interface ListingCardProps {
  label?: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionUrl?: string;
  className?: string;
}

export function ListingCard({
  label,
  title,
  subtitle,
  actionLabel = "Learn More",
  actionUrl,
  className = ""
}: ListingCardProps) {
  return (
    <div className={`bg-base-100 border-t-4 border-accent p-4 shadow-md hover:shadow-xl transition-shadow ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          {label && (
            <p className="text-sm text-accent uppercase tracking-wide mb-1">{label}</p>
          )}
          <p className="font-bold text-lg">{title}</p>
          {subtitle && (
            <p className="text-base-content/70">{subtitle}</p>
          )}
        </div>
        {actionUrl && (
          <a
            href={actionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent btn-sm"
          >
            {actionLabel}
          </a>
        )}
      </div>
    </div>
  );
}
