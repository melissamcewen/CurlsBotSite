'use client';

import { useState, useEffect } from 'react';

export function CurlyTechniquesForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Define the success handler function for MailerLite
    window.ml_webform_success_25669012 = function () {
      setIsSuccess(true);
    };

    return () => {
      // Clean up when component unmounts
      if (window.ml_webform_success_25669012) {
        delete window.ml_webform_success_25669012;
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
        'https://assets.mailerlite.com/jsonp/1500551/forms/153692358159894267/subscribe',
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
    <div className="space-y-4">
      {!isSuccess ? (
        <>
          <div className="text">
            <h4 className="text-xl font-bold mb-2">
              Subscribe to get the book sent to your inbox!
            </h4>
            <p className="text-base-content/80">
              I think our newsletter is pretty cool. I only send out interesting emails about new blog posts and Curlsbot features! You can unsubscribe at any time.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control w-full">
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
              {errorMessage && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errorMessage}
                  </span>
                </label>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  <span className="hidden sm:inline">Subscribing...</span>
                  <span className="sm:hidden">...</span>
                </>
              ) : (
                'Subscribe & Send Me the Book'
              )}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-4">
          <h4 className="text-xl font-bold text-success mb-2">Thank you!</h4>
          <p className="text-base-content/80">
            Check your email for your free guide.
          </p>
        </div>
      )}
    </div>
  );
}

// Add this to make TypeScript recognize the global function
declare global {
  interface Window {
    ml_webform_success_25669012?: () => void;
  }
}
