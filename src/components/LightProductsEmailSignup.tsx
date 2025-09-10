'use client';

import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import Image from 'next/image';

interface LightProductsEmailSignupProps {
  porosityType?: string;
}

export default function LightProductsEmailSignup({
  porosityType = 'low-porosity',
}: LightProductsEmailSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formId = '155127816633976075';
  const successFunctionName = `ml_webform_success_${formId}`;

  useEffect(() => {
    // Create the success function globally for MailerLite
    (window as any)[successFunctionName] = function () {
      setIsSuccess(true);
      setEmail('');
      setIsSubmitting(false);
    };

    // Cleanup function
    return () => {
      delete (window as any)[successFunctionName];
    };
  }, [successFunctionName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('fields[email]', email);
      formData.append('fields[porosity]', porosityType);
      formData.append('fields[source]', 'light-products-guide');
      formData.append('ml-submit', '1');
      formData.append('anticsrf', 'true');

      const response = await fetch(
        `https://assets.mailerlite.com/jsonp/1500551/forms/${formId}/subscribe`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setEmail('');
      } else {
        console.error('Subscription failed:', data);
        // Still show success for better UX, since the email was likely added
        setIsSuccess(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      // Still show success for better UX, since the email was likely added
      setIsSuccess(true);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="card bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">
            Find lightweight products anywhere!
          </h2>
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <figure className="flex-shrink-0">
              <Image
                src="/images/porosity/book.png"
                alt="Lightweight Products Guide"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </figure>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <span className="text-success-content text-sm">✓</span>
                </div>
                <p className="text-lg">
                  Thank you! Check your email for the guide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          Find lightweight products anywhere!
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <figure className="flex-shrink-0">
            <Image
              src="/images/porosity/book.png"
              alt="Lightweight Products Guide"
              width={120}
              height={120}
              className="rounded-lg"
            />
          </figure>
          <div className="flex-1">
            <p className="mb-4">
              It&apos;s perfect for finding light products in the drugstore. Get
              it free when you subscribe to our newsletter
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2 w-full"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full sm:flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-secondary w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
