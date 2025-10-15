import { NewsletterSignup as BaseNewsletterSignup } from '../EmailSignupVariants';

interface NewsletterSignupProps {
  fieldName?: string;
  fieldValue?: string;
  text?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export default function NewsletterSignup({
  fieldName = 'fields[source]',
  fieldValue = 'newsletter-inline',
  text = 'Get weekly curly hair tips delivered to your inbox',
  buttonText = 'Subscribe',
  placeholder = 'Email',
  className = '',
}: NewsletterSignupProps) {
  return (
    <BaseNewsletterSignup
      fieldName={fieldName}
      fieldValue={fieldValue}
      text={text}
      buttonText={buttonText}
      placeholder={placeholder}
      className={className}
    />
  );
}
