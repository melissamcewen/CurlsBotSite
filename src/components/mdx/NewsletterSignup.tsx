'use client';

import { Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NewsletterSignupProps {
  fieldName?: string;
  fieldValue?: string;
  text?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export default function NewsletterSignup({
  fieldName = 'fields[source]',
  fieldValue = 'newsletter-inline',
  text = 'Get weekly curly hair tips delivered to your inbox',
  buttonText = 'Subscribe',
  placeholder = 'Email',
  className = '',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formId = '164452290856486602';
  const containerId = 'mlb2-newsletter-inline';
  const successFunctionName = `ml_webform_success_${formId}`;

  useEffect(() => {
    // Create the success function globally for MailerLite Universal
    (window as any)[successFunctionName] = function () {
      setIsSuccess(true);
      setEmail('');
      setIsSubmitting(false);
    };

    // Cleanup function
    return () => {
      delete (window as any)[successFunctionName];
      setIsSubmitting(false);
    };
  }, [successFunctionName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('fields[email]', email);
      formData.append(fieldName, fieldValue);
      formData.append('ml-submit', '1');
      formData.append('anticsrf', 'true');

      const response = await fetch(
        `https://assets.mailerlite.com/jsonp/1500551/forms/${formId}/subscribe`,
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        },
      );

      // Since we can't read the response with no-cors, we'll rely on the success callback
      // The success function will be called by MailerLite's JSONP response
    } catch (error) {
      console.error('Subscription error:', error);
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className={`card bg-base-100 shadow-sm border border-base-300 p-4 ${className}`}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-success" />
          <span className="text-sm text-success">✓ Subscribed! Thank you!</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`card bg-base-100 shadow-sm border border-base-300 p-4 ${className}`}
    >
      <div className="card-body p-0">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm">{text}</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2"
          aria-busy={isSubmitting}
        >
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="fields[email]"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered input-sm"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-sm whitespace-nowrap"
          >
            {isSubmitting ? 'Subscribing...' : `${buttonText} →`}
          </button>
        </form>
      </div>
    </div>
  );
}
