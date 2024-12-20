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
          "This ingredient list seems okay, but I'm only a robot! It's always a good idea to double-check and see if there's anything you're unsure about. Your hair is unique, so do what works best for you.",
      };
    case 'warning':
      return {
        color: 'error',
        bgClass: 'bg-error',
        textClass: 'text-error',
        alertClass: 'alert-error',
        alertContentClass: 'text-error-content',
        description:
          'Yikes, I found some ingredients in this list that might not be the best for your hair. You might want to consider a different product or check with a hair expert. Your hair deserves the best!',
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
