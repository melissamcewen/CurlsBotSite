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
      formId="167823633053386557"
      containerId="mlb2-31908045"
      fieldName="fields[porosity]"
      fieldValue={porosityType}
      title={`Want to master your ${porosityType.replace('-', ' ')} hair?`}
      className="bg-base-100 cb-card-lite md:col-span-2 mb-8"
    />
  );
}
