import { LightProductsEmailSignup as BaseLightProductsEmailSignup } from './EmailSignupVariants';

interface LightProductsEmailSignupProps {
  porosityType?: string;
}

export default function LightProductsEmailSignup({
  porosityType = 'low-porosity',
}: LightProductsEmailSignupProps) {
  return <BaseLightProductsEmailSignup porosityType={porosityType} />;
}
