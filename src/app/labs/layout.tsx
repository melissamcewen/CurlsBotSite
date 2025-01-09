import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CurlsBot Labs',
  description:
    'Experimental features and tools to help you on your curly hair journey. Try our FrizzBot weather forecast, ingredient analysis, and more.',
  openGraph: {
    title: 'CurlsBot Labs',
    description:
      'Experimental features and tools to help you on your curly hair journey.',
  },
};

export default function LabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
