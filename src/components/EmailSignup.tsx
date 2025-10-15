import { EmailSignup as BaseEmailSignup } from './EmailSignupVariants';

interface EmailSignupProps {
  hairType: string;
}

export default function EmailSignup({ hairType }: EmailSignupProps) {
  return <BaseEmailSignup hairType={hairType} />;
}
