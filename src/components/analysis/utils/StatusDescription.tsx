import React from 'react';
import Link from 'next/link';

interface StatusDescriptionProps {
  status: string;
}

export const StatusDescription: React.FC<StatusDescriptionProps> = ({
  status,
}) => {
  const cgmLink = (
    <Link href="/curly-girl-method" className="link">
      Curly Girl Method
    </Link>
  );

  switch (status) {
    case 'ok':
      return (
        <>
          This product doesn’t include any ingredients typically avoided under
          the {cgmLink}. That’s a good sign if you’re following the method — but
          keep in mind that product performance depends on more than just the
          ingredient list. Scroll down for the full breakdown.
        </>
      );
    case 'warning':
      return (
        <>
          This product contains some ingredients that aren’t considered
          compatible with the {cgmLink}. That doesn’t necessarily mean they’re
          harmful — just that they fall outside the method’s guidelines. Scroll
          down to see the full analysis and decide what works best for your
          routine.
        </>
      );
    case 'caution':
      return (
        <>
          We found a few ingredients that are typically avoided by people
          following the {cgmLink}. Whether or not they’re a concern depends on
          your hair needs and preferences. Keep scrolling for the detailed
          results.
        </>
      );
    case 'error':
      return (
        <>
          Hmm, that doesn&apos;t look like an ingredient list. Want to try
          pasting it again?
        </>
      );
    default:
      return (
        <>
          We analyzed your ingredients and found some items that may not align
          with certain routines like the {cgmLink}. Scroll down to explore the
          full results and explanations.
        </>
      );
  }
};
