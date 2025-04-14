import { createPageMetadata } from '@/config/metadata';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = createPageMetadata({
  title: 'Sign Up - CurlsBot for Brands',
  description: 'Sign up or manage your CurlsBot brand account.',
  path: '/brands/sign-up',
});

export default function SignUp() {
  return (
    <div className="hero bg-base-100 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image src="/normal.svg" alt="CurlsBot" width={500} height={500} />
        <div>
          <h2 className="text-5xl font-bold">CurlsBot for Brands</h2>
          <p className="py-6">
            Join CurlsBot to connect with hair care enthusiasts and grow your
            brand.
          </p>
          <div className="flex gap-4">
            <a
              href="https://buy.stripe.com/14k2ak4We8K30IE3cc"
              className="btn btn-primary"
            >
              Sign Up (basic)
            </a>
            <a
              href="https://billing.stripe.com/p/login/4gw9C0giR5Jm9WweUU"
              className="btn btn-secondary"
            >
              Manage your subscription
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
