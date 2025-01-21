import { Search, ShoppingCart } from 'lucide-react';


export function Affiliate() {
  return (
    <div role="alert" className="alert bg-primary/10">
      <ShoppingCart />
      <span className="text-sm">
        All products featured on CurlsBot are independently and thoughtfully
        selected by us. However, when you buy something through our retail
        links, we may earn an affiliate commission. This helps us keep CurlsBot
        running. We thank you for your support!
      </span>
    </div>
  );
}
