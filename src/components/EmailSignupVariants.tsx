import BaseEmailSignup, { EMAIL_SIGNUP_CONFIGS } from './BaseEmailSignup';

// Hair Type Email Signup
interface EmailSignupProps {
  hairType: string;
}

export function EmailSignup({ hairType }: EmailSignupProps) {
  return (
    <BaseEmailSignup
      variant="hairType"
      fieldValue={hairType}
      title="Want help mastering your curls or waves?"
    />
  );
}

// Porosity Email Signup
interface PorosityEmailSignupProps {
  porosityType: string;
}

export function PorosityEmailSignup({
  porosityType,
}: PorosityEmailSignupProps) {
  return (
    <BaseEmailSignup
      variant="porosity"
      fieldValue={porosityType}
      title={`Want to master your ${porosityType.replace('-', ' ')} hair?`}
      className="bg-base-100 cb-card-lite md:col-span-2 mb-8"
    />
  );
}

// Light Products Email Signup - Hero Layout
interface LightProductsEmailSignupProps {
  porosityType?: string;
}

export function LightProductsEmailSignup({
  porosityType = 'low-porosity',
}: LightProductsEmailSignupProps) {
  return (
    <BaseEmailSignup
      variant="lightProducts"
      fieldValue={porosityType}
      title="Find lightweight products anywhere!"
      description="It's perfect for finding light products in the drugstore. Get it free when you subscribe to our newsletter"
      buttonText="Subscribe"
      layout="hero"
      showImage={true}
      imageSrc="/images/porosity/book.png"
      imageAlt="Lightweight Products Guide"
      imageSize={120}
      icon="book"
    />
  );
}

// Light Products Email Signup - Compact Layout
export function CompactEmailSignup({
  porosityType = 'low-porosity',
  placeholder = 'Enter your email…',
  buttonText = 'Get the ebook',
}: {
  porosityType?: string;
  placeholder?: string;
  buttonText?: string;
}) {
  return (
    <BaseEmailSignup
      variant="lightProducts"
      fieldValue={porosityType}
      title="Looking for light products for your fine, wavy, or low porosity hair?"
      description="Get our ebook that teaches you how to find light products anywhere."
      placeholder={placeholder}
      buttonText={buttonText}
      layout="compact"
      showIcon={false}
    />
  );
}

// TikTok Email Signup - Compact Layout
export function TikTokEmailSignup({
  placeholder = 'Enter your email…',
  buttonText = 'Get the ebook',
}: {
  placeholder?: string;
  buttonText?: string;
}) {
  return (
    <BaseEmailSignup
      variant="tiktok"
      fieldValue=""
      title="Looking for light products for your fine, wavy, or low porosity hair?"
      description="Get our ebook that teaches you how to find light products anywhere."
      placeholder={placeholder}
      buttonText={buttonText}
      layout="compact"
      showIcon={false}
    />
  );
}

// Newsletter Signup - Inline Layout
interface NewsletterSignupProps {
  fieldName?: string;
  fieldValue?: string;
  text?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export function NewsletterSignup({
  fieldName = 'fields[source]',
  fieldValue = 'newsletter-inline',
  text = 'Get weekly curly hair tips delivered to your inbox',
  buttonText = 'Subscribe',
  placeholder = 'Email',
  className = '',
}: NewsletterSignupProps) {
  return (
    <BaseEmailSignup
      variant="lightProducts"
      fieldValue={fieldValue}
      title={text}
      placeholder={placeholder}
      buttonText={buttonText}
      className={className}
      layout="inline-image"
      showImage={true}
      imageSrc="/images/porosity/book.png"
      imageAlt="Lightweight Products Guide"
    />
  );
}

// Light Products Newsletter Signup - Hero Layout with Image
export function LightProductsNewsletterSignup({
  fieldName = 'fields[source]',
  fieldValue = 'light-products-newsletter',
  text = 'Get our free lightweight products guide!',
  buttonText = 'Get the ebook',
  placeholder = 'Enter your email',
  className = '',
}: NewsletterSignupProps) {
  return (
    <BaseEmailSignup
      variant="lightProducts"
      fieldValue={fieldValue}
      title={text}
      description="Perfect for finding light products in the drugstore. Get it free when you subscribe to our newsletter."
      placeholder={placeholder}
      buttonText={buttonText}
      className={className}
      layout="hero"
      showImage={true}
      imageSrc="/images/light-products-mini-guide.png"
      imageAlt="Lightweight Products Mini Guide"
      imageSize={120}
      icon="book"
    />
  );
}
