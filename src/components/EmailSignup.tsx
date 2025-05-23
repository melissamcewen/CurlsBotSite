'use client';

import EmailSignupForm from './EmailSignupForm';

interface EmailSignupProps {
  hairType: string;
}

export default function EmailSignup({ hairType }: EmailSignupProps) {
  return (
    <EmailSignupForm
      formId="153960439877732029"
      containerId="mlb2-25803942"
      fieldName="fields[hair_type]"
      fieldValue={hairType}
      title="Want help mastering your curls or waves?"
    />
  );
}
