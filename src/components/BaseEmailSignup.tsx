'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';

// Form configurations for different use cases
export const EMAIL_SIGNUP_CONFIGS = {
  hairType: {
    formId: '153960439877732029',
    containerId: 'mlb2-25803942',
    fieldName: 'fields[hair_type]',
    source: 'hair-type-quiz',
  },
  porosity: {
    formId: '167823633053386557',
    containerId: 'mlb2-31908045',
    fieldName: 'fields[porosity]',
    source: 'porosity-quiz',
  },
  lightProducts: {
    formId: '155127816633976075',
    containerId: 'mlb2-light-products',
    fieldName: 'fields[porosity]',
    source: 'light-products-guide',
  },
  tiktok: {
    formId: '168350514875991134',
    containerId: 'mlb2-32132162',
    fieldName: 'fields[email]',
    source: 'tiktok-link-bio',
  },
  newsletter: {
    formId: '164452290856486602',
    containerId: 'mlb2-newsletter-inline',
    fieldName: 'fields[source]',
    source: 'newsletter-inline',
  },
} as const;

export type EmailSignupVariant = keyof typeof EMAIL_SIGNUP_CONFIGS;

interface BaseEmailSignupProps {
  variant: EmailSignupVariant;
  fieldValue: string;
  title: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
  // Layout variants
  layout?: 'card' | 'compact' | 'inline' | 'inline-image' | 'hero';
  // Visual variants
  showIcon?: boolean;
  icon?: 'mail' | 'sparkles' | 'book';
  showImage?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  imageSize?: number;
}

export default function BaseEmailSignup({
  variant,
  fieldValue,
  title,
  description,
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  className = '',
  layout = 'card',
  showIcon = true,
  icon = 'mail',
  showImage = false,
  imageSrc,
  imageAlt,
  imageSize = 120,
}: BaseEmailSignupProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = EMAIL_SIGNUP_CONFIGS[variant];

  const renderIcon = () => {
    if (!showIcon) return null;

    const iconClass = layout === 'compact' ? 'w-4 h-4' : 'w-6 h-6';

    switch (icon) {
      case 'sparkles':
        return <Sparkles className={`${iconClass} text-primary`} />;
      case 'book':
        return showImage && imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt || 'Guide'}
            width={layout === 'compact' ? 20 : 50}
            height={layout === 'compact' ? 20 : 50}
            className="rounded"
          />
        ) : (
          <Mail className={`${iconClass} text-primary`} />
        );
      default:
        return <Mail className={`${iconClass} text-primary`} />;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(
        `https://assets.mailerlite.com/jsonp/1500551/forms/${config.formId}/subscribe`,
        {
          method: 'POST',
          body: formData,
        },
      );

      // MailerLite returns HTML, not JSON, so we just check if the request succeeded
      if (response.ok) {
        setIsSuccess(true);
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed:', response.status);
        // Still show success for better UX
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Still show success for better UX
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    if (isSuccess) {
      return (
        <div
          className={`flex items-center gap-2 ${
            layout === 'compact'
              ? 'rounded-xl border border-success/30 bg-success/10 px-3 py-2 text-sm text-success'
              : 'text-success'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          <span>
            {layout === 'compact'
              ? 'Check your email for the guide.'
              : 'Thank you! You have successfully joined our subscriber list.'}
          </span>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit}>
        <div
          className={
            layout === 'compact'
              ? 'flex gap-2'
              : 'flex flex-col md:flex-row gap-3'
          }
        >
          <div className="grow">
            <input
              aria-label="email"
              aria-required="true"
              type="email"
              className={`input input-bordered w-full ${
                layout === 'compact' ? 'h-11' : ''
              }`}
              name="fields[email]"
              placeholder={placeholder}
              autoComplete="email"
              required
            />
          </div>

          {fieldValue && (
            <input type="hidden" name={config.fieldName} value={fieldValue} />
          )}
          <input type="hidden" name="fields[source]" value={config.source} />
          <input type="hidden" name="ml-submit" value="1" />
          <input type="hidden" name="anticsrf" value="true" />

          <button
            type="submit"
            className={`btn btn-primary ${
              layout === 'compact'
                ? 'h-11 px-5 whitespace-nowrap'
                : 'whitespace-nowrap'
            }`}
            disabled={isSubmitting}
          >
            {layout === 'compact' && (
              <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
            )}
            {isSubmitting ? 'Submitting...' : buttonText}
            {layout !== 'compact' && !isSubmitting && ' →'}
          </button>
        </div>
      </form>
    );
  };

  // Layout variants
  if (layout === 'compact') {
    return <div className={className}>{renderForm()}</div>;
  }

  if (layout === 'inline') {
    return (
      <div
        className={`card bg-base-100 shadow-sm border border-base-300 p-4 ${className}`}
      >
        <div className="card-body p-0">
          <div className="flex items-center gap-2 mb-3">
            {renderIcon()}
            <span className="text-sm">{title}</span>
          </div>
          {renderForm()}
        </div>
      </div>
    );
  }

  if (layout === 'inline-image') {
    return (
      <div
        className={`card card-side bg-base-100 shadow-sm border border-base-300 not-prose ${className}`}
      >
        {showImage && imageSrc && (
          <figure className="flex-shrink-0">
            <Image
              src={imageSrc}
              alt={imageAlt || 'Guide'}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </figure>
        )}
        <div className="card-body ">
          <h3 className="text-sm font-medium mb-3">{title}</h3>
          {renderForm()}
        </div>
      </div>
    );
  }

  if (layout === 'hero') {
    return (
      <div className={`card bg-primary text-primary-content ${className}`}>
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">{title}</h2>
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {showImage && imageSrc && (
              <figure className="flex-shrink-0">
                <Image
                  src={imageSrc}
                  alt={imageAlt || 'Guide'}
                  width={imageSize}
                  height={imageSize}
                  className="rounded-lg"
                />
              </figure>
            )}
            <div className="flex-1">
              {description && <p className="mb-4">{description}</p>}
              {renderForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card layout
  return (
    <div className={`bg-base-100 cb-card-lite md:col-span-2 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        {renderIcon()}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      {description && <p className="mb-6">{description}</p>}
      {renderForm()}
    </div>
  );
}
