import { AbbeyYungEmailSignup as BaseAbbeyYungEmailSignup } from '../EmailSignupVariants';

interface AbbeyYungEmailSignupProps {
  title?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export default function AbbeyYungEmailSignup({
  title,
  buttonText,
  placeholder,
  className = '',
}: AbbeyYungEmailSignupProps) {
  return (
    <BaseAbbeyYungEmailSignup
      title={title}
      buttonText={buttonText}
      placeholder={placeholder}
      className={`not-prose ${className}`.trim()}
    />
  );
}
