'use client';

import { Sparkles } from 'lucide-react';

interface EmailSignupProps {
  hairType: string;
}

export default function EmailSignup({ hairType }: EmailSignupProps) {
  return (
    <div className="bg-base-100 cb-card-lite md:col-span-2">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold">
          Want help mastering your curls or waves?
        </h3>
      </div>

      <p className="mb-6">
        Get our free Curly Techniques Dictionary with 60+ methods to define
        curls, boost volume, and fight frizz—sorted by difficulty and
        curl-friendliness.
      </p>

      <form
        action="https://assets.mailerlite.com/jsonp/1500551/forms/153960439877732029/subscribe"
        method="post"
        target="_blank"
        className="flex flex-col md:flex-row gap-3"
      >
        <input
          type="email"
          name="fields[email]"
          placeholder="Your email"
          required
          className="input input-bordered w-full"
        />
        <input type="hidden" name="fields[hair_type]" value={hairType} />
        <input type="hidden" name="ml-submit" value="1" />
        <input type="hidden" name="anticsrf" value="true" />

        <button type="submit" className="btn btn-primary">
          Get the Free Guide →
        </button>
      </form>
    </div>
  );
}
