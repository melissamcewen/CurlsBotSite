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
          This product doesn&apos;t include any ingredients that people prefer to avoid if they are following curly hair methods like
          the {cgmLink}. Scroll down to view the whole report.

        </>
      );
    case 'warning':
      return (
        <>
          This product contains some ingredients some people prefer to avoid,
          especially if they are following the {cgmLink}. That doesn&apos;t
          necessarily mean they&apos;re harmful, and in fact they can work for some
          people. Scroll down to see the full analysis and decide what works best
          for your routine.
        </>
      );
    case 'caution':
      return (
        <>
          We found a few ingredients that some people prefer to avoid, especially if they are following the {cgmLink} strictly. Whether or not they&apos;re a concern depends on
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
