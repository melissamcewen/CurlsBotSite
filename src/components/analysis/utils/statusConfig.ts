interface StatusConfig {
  color: string;
  bgClass: string;
  textClass: string;
  alertClass: string;
  alertContentClass: string;
  description: string;
}

export const getStatusConfig = (status: string): StatusConfig => {
  switch (status) {
    case 'ok':
      return {
        color: 'success',
        bgClass: 'bg-info',
        textClass: 'text-info',
        alertClass: 'alert-info',
        alertContentClass: 'text-info-content',
        description:
          "This ingredient list doesn't seem to have any ingredients that people following CGM tend to avoid. But a product's qualities depend on the formula, not just the ingredients. It's always a good idea to double-check and do research on how the product performs.",
      };
    case 'warning':
      return {
        color: 'error',
        bgClass: 'bg-error',
        textClass: 'text-error',
        alertClass: 'alert-error',
        alertContentClass: 'text-error-content',
        description:
          "We've analyzed your ingredients and found some ingredients that people following CGM tend to avoid. But it's worth noting that a product's qualities depend on the formula, not just the ingredients. Check the detailed analysis below.",
      };
    case 'caution':
      return {
        color: 'warning',
        bgClass: 'bg-warning',
        textClass: 'text-warning',
        alertClass: 'alert-warning',
        alertContentClass: 'text-warning-content',
        description:
          'Hmm, I found a few tricky ingredients on the list that some people like to avoid. They might be okay for most people and a product\'s qualities depend on the formula, not just the ingredients. Check the detailed analysis below.',
      };
    case 'error':
      return {
        color: 'error',
        bgClass: 'bg-error',
        textClass: 'text-error',
        alertClass: 'alert-error',
        alertContentClass: 'text-error-content',
        description:
          "Huh is this an ingredients list?",
      };
    default:
      return {
        color: 'base',
        bgClass: 'bg-base-300',
        textClass: 'text-base-content',
        alertClass: 'alert-info',
        alertContentClass: 'text-info-content',
        description:
          "We've analyzed your ingredients and found some items that may need attention. Check the detailed analysis below.",
      };
  }
};
