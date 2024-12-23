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
          "CurlsBot approved! This ingredient list seems good, but I'm only a robot! It's always a good idea to double-check and see if there's anything you're unsure about. Your hair is unique, so do what works best for you.",
      };
    case 'warning':
      return {
        color: 'error',
        bgClass: 'bg-error',
        textClass: 'text-error',
        alertClass: 'alert-error',
        alertContentClass: 'text-error-content',
        description:
          "We've analyzed your ingredients and found some items that may need attention. Check the detailed analysis below",
      };
    case 'caution':
      return {
        color: 'warning',
        bgClass: 'bg-warning',
        textClass: 'text-warning',
        alertClass: 'alert-warning',
        alertContentClass: 'text-warning-content',
        description:
          'Hmm, I found a few tricky ingredients in this list. They might be okay for most people, but it’s always a good idea to double-check! You know your hair best, so listen to it.',
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
