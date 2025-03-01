import Link from 'next/link';

interface Crumb {
  href: string;
  label: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="text-sm breadcrumbs mb-4">
      <ul>
        <li>
          <Link href="/" className="text-base-content/70 hover:text-primary">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href}>
            {index === items.length - 1 ? (
              <span className="text-base-content">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-base-content/70 hover:text-primary"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
