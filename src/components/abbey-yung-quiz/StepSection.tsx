'use client';

export function StepSection({
  stepNumber,
  title,
  description,
  note,
  children,
}: {
  stepNumber: number;
  title: string;
  description: string;
  note?: string | null;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-base-200 p-4 md:p-6">
      <h3 className="text-lg font-bold text-base-content">
        Step {stepNumber} — {title}
      </h3>
      <p className="mt-2 text-sm text-base-content">{description}</p>
      {note ? (
        <p className="mt-2 text-sm font-medium text-base-content">{note}</p>
      ) : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}
