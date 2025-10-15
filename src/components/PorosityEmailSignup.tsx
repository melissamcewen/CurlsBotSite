import { PorosityEmailSignup as BasePorosityEmailSignup } from './EmailSignupVariants';

interface PorosityEmailSignupProps {
  porosityType: string;
}

export default function PorosityEmailSignup({
  porosityType,
}: PorosityEmailSignupProps) {
  return <BasePorosityEmailSignup porosityType={porosityType} />;
}
