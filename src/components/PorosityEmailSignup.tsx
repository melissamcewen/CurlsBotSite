'use client';

import EmailSignupForm from './EmailSignupForm';

interface PorosityEmailSignupProps {
  porosityType: string;
}

export default function PorosityEmailSignup({
  porosityType,
}: PorosityEmailSignupProps) {
  return (
    <EmailSignupForm
      formId="155127816633976075"
      containerId="mlb2-26314505"
      fieldName="fields[porosity]"
      fieldValue={porosityType}
      title={`Want to master your ${porosityType.replace('-', ' ')} hair?`}
      className="bg-base-100 cb-card-lite md:col-span-2 mb-8"
    />
  );
}
