'use client';

import { Sparkles } from 'lucide-react';
import { useEffect } from 'react';

interface EmailSignupFormProps {
  formId: string;
  containerId: string;
  fieldName: string;
  fieldValue: string;
  title: string;
  description?: string;
  className?: string;
}

export default function EmailSignupForm({
  formId,
  containerId,
  fieldName,
  fieldValue,
  title,
  description = 'Get our free Curly Techniques Dictionary with 60+ methods to define curls, boost volume, and fight frizz—sorted by difficulty and curl-friendliness.',
  className = 'bg-base-100 cb-card-lite md:col-span-2',
}: EmailSignupFormProps) {
  const successFunctionName = containerId.replace(
    'mlb2-',
    'ml_webform_success_',
  );

  useEffect(() => {
    // Create the success function globally for MailerLite Universal
    (window as any)[successFunctionName] = function () {
      const $ = (window as any).ml_jQuery || (window as any).jQuery;
      if ($) {
        $(
          `.ml-subscribe-form-${containerId.replace('mlb2-', '')} .row-success`,
        ).show();
        $(
          `.ml-subscribe-form-${containerId.replace('mlb2-', '')} .row-form`,
        ).hide();
      }
    };

    // Cleanup function
    return () => {
      delete (window as any)[successFunctionName];
    };
  }, [containerId, successFunctionName]);

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <p className="mb-6">{description}</p>

      <div
        id={containerId}
        className={`ml-form-embedContainer ml-subscribe-form ml-subscribe-form-${containerId.replace(
          'mlb2-',
          '',
        )}`}
      >
        <div className="ml-form-align-center">
          <div className="ml-form-embedWrapper embedForm">
            <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
              <form
                className="ml-block-form"
                action={`https://assets.mailerlite.com/jsonp/1500551/forms/${formId}/subscribe`}
                data-code=""
                method="post"
                target="_blank"
              >
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-grow">
                    <input
                      aria-label="email"
                      aria-required="true"
                      type="email"
                      className="input input-bordered w-full"
                      data-inputmask=""
                      name="fields[email]"
                      placeholder="Your email"
                      autoComplete="email"
                    />
                  </div>

                  <input type="hidden" name={fieldName} value={fieldValue} />
                  <input type="hidden" name="ml-submit" value="1" />
                  <input type="hidden" name="anticsrf" value="true" />

                  <button
                    type="submit"
                    className="btn btn-primary whitespace-nowrap"
                  >
                    Get the Free Guide →
                  </button>
                </div>
              </form>
            </div>

            <div
              className="ml-form-successBody row-success"
              style={{ display: 'none' }}
            >
              <div className="ml-form-successContent">
                <h4>Thank you!</h4>
                <p>You have successfully joined our subscriber list.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
