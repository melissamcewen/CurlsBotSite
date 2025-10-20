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
  fieldValue = 'light-products-newsletter',
  text = 'Get our free lightweight products guide! It has tips for finding light products at any store with dozens of example products and routines',
  buttonText = 'Get the ebook',
  placeholder = 'Enter your email',
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
