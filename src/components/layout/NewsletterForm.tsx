'use client';

import { useState, useEffect } from 'react';

export function NewsletterForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Define the success handler function for MailerLite
    window.ml_webform_success_25660567 = function () {
      setIsSuccess(true);
    };

    return () => {
      // Clean up when component unmounts
      if (window.ml_webform_success_25660567) {
        delete window.ml_webform_success_25660567;
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    if (!email?.value) {
      setErrorMessage('Email is required');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('fields[email]', email.value);
      formData.append('ml-submit', '1');
      formData.append('anticsrf', 'true');

      const response = await fetch(
        'https://assets.mailerlite.com/jsonp/1500551/forms/153675641835750754/subscribe',
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        const errorMsg =
          data.errors?.fields?.email?.[0] ||
          'Something went wrong. Please try again.';
        setErrorMessage(errorMsg);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Newsletter submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="mlb2-25660567"
      className="bg-base-100 rounded-box p-6 space-y-4 md:max-w-sm"
    >
      {!isSuccess ? (
        <>
          <span className="text-lg font-bold text-base-content">
            Join the CurlsBot Community! 💌
          </span>
          <p className="text-sm text-base-content/80">
            Get hair care tips, product recommendations, and ingredient alerts
            delivered to your inbox.
          </p>
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 ml-form-embedSubmit"
              id="newsletter-form"
            >
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`input input-bordered w-full ${
                    errorMessage ? 'input-error' : ''
                  }`}
                  required
                  aria-label="email"
                  aria-required="true"
                  autoComplete="email"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    <span className="hidden sm:inline">Subscribing...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
            {errorMessage && (
              <p className="text-error text-xs mt-1">{errorMessage}</p>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-4">
          <h4 className="text-lg font-bold text-success mb-2">Thank you!</h4>
          <p className="text-base-content/80">
            You have successfully joined our subscriber list.
          </p>
        </div>
      )}
    </div>
  );
}

// Add this to make TypeScript recognize the global function
declare global {
  interface Window {
    ml_webform_success_25660567?: () => void;
  }
}
