'use client';

import { Sparkles } from 'lucide-react';
import { useEffect } from 'react';

interface PorosityEmailSignupProps {
  porosityType: string;
}

export default function PorosityEmailSignup({
  porosityType,
}: PorosityEmailSignupProps) {
  useEffect(() => {
    // Load MailerLite script
    const script = document.createElement('script');
    script.src =
      'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024';
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-base-100 cb-card-lite md:col-span-2 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold">
          Want to master your {porosityType.replace('-', ' ')} hair?
        </h3>
      </div>

      <p className="mb-6">
        Get our free Curly Techniques Dictionary with 60+ methods to define
        curls, boost volume, and fight frizz—sorted by difficulty and
        curl-friendliness.
      </p>

      <div
        id="mlb2-26314505"
        className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-26314505"
      >
        <div className="ml-form-align-center">
          <div className="ml-form-embedWrapper embedForm">
            <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
              <form
                className="ml-block-form"
                action="https://assets.mailerlite.com/jsonp/1500551/forms/153960439877732029/subscribe"
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
                      name="fields[email]"
                      placeholder="Your email"
                      autoComplete="email"
                    />
                  </div>

                  <input
                    type="hidden"
                    name="fields[hair_type]"
                    value={porosityType}
                  />
                  <input
                    type="hidden"
                    name="fields[porosity]"
                    value={porosityType}
                  />
                  <input type="hidden" name="ml-submit" value="1" />
                  <input type="hidden" name="anticsrf" value="true" />

                  <button type="submit" className="btn btn-primary whitespace-nowrap">
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

      <script
        dangerouslySetInnerHTML={{
          __html: `
            function ml_webform_success_26314505() {
              var $ = ml_jQuery || jQuery;
              $('.ml-subscribe-form-26314505 .row-success').show();
              $('.ml-subscribe-form-26314505 .row-form').hide();
            }
          `,
        }}
      />
    </div>
  );
}
