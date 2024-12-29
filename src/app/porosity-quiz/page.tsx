import Quiz from './Quiz';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hair Porosity Quiz | Find Your Hair Porosity Type',
  description:
    'Take our free hair porosity quiz to discover if you have low, normal, or high porosity hair. Get personalized hair care tips and product recommendations based on your results.',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: '/porosity-quiz',
  },
  openGraph: {
    title: 'Hair Porosity Quiz | CurlsBot',
    description:
      'Take our hair porosity quiz to find out if you have low, normal, or high porosity hair. Get personalized hair care recommendations based on your results.',
    url: '/porosity-quiz',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Hair Porosity Quiz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hair Porosity Quiz | Find Your Hair Type',
    description:
      'Take our free hair porosity quiz to discover if you have low, normal, or high porosity hair. Get personalized hair care tips and product recommendations.',
    images: ['/images/og-default.png'],
  },
};

export default function QuizPage() {
  return <Quiz />;
}
