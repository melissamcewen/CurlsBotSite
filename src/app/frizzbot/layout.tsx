import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FrizzBot Weather Forecast',
  description:
    'Get personalized hair care recommendations based on your local weather conditions. Analyze temperature, humidity, and dew point to manage frizz.',
  openGraph: {
    title: 'FrizzBot Weather Forecast',
    description:
      'Get personalized hair care recommendations based on your local weather conditions.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
