interface BeforeAfterDiffProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  caption: string;
}

export function BeforeAfterDiff({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  caption,
}: BeforeAfterDiffProps) {
  return (
    <div className="flex flex-col gap-2">
      <figure
        className="diff aspect-square w-full rounded-2xl border border-base-300"
        tabIndex={0}
      >
        <div className="diff-item-1" role="img" tabIndex={0}>
          <img alt={beforeAlt} src={beforeSrc} />
        </div>
        <div className="diff-item-2" role="img">
          <img alt={afterAlt} src={afterSrc} />
        </div>
        <div className="diff-resizer" />
      </figure>
      <figcaption className="text-sm text-base-content/70 text-center">
        {caption}
      </figcaption>
    </div>
  );
}

interface BeforeAfterDiffGridProps {
  children: React.ReactNode;
  columns?: number;
}

export function BeforeAfterDiffGrid({
  children,
  columns = 3,
}: BeforeAfterDiffGridProps) {
  const style: React.CSSProperties & { '--columns': number } = {
    '--columns': columns,
  };

  return (
    <div
      className="not-prose my-8 w-full grid grid-cols-1 md:grid-cols-[repeat(var(--columns),minmax(0,1fr))] gap-4"
      style={style}
    >
      {children}
    </div>
  );
}
