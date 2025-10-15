import { CompactEmailSignup as BaseCompactEmailSignup } from './EmailSignupVariants';

interface CompactEmailSignupProps {
  porosityType?: string;
  placeholder?: string;
  buttonText?: string;
}

export default function CompactEmailSignup({
  porosityType = 'low-porosity',
  placeholder = 'Enter your email…',
  buttonText = 'Get the ebook',
}: CompactEmailSignupProps) {
  return (
    <BaseCompactEmailSignup
      porosityType={porosityType}
      placeholder={placeholder}
      buttonText={buttonText}
    />
  );
}
