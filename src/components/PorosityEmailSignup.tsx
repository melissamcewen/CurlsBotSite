import { PorosityEmailSignup as BasePorosityEmailSignup } from './EmailSignupVariants';

export interface PorosityEmailSignupProps {
  porosityType: string;
  layout?: 'card' | 'compact';
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export default function PorosityEmailSignup(props: PorosityEmailSignupProps) {
  return <BasePorosityEmailSignup {...props} />;
}
