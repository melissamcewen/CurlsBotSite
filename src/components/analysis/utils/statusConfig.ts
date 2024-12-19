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
        bgClass: 'bg-success',
        textClass: 'text-success',
        alertClass: 'alert-success',
        alertContentClass: 'text-success-content',
        description: "We haven't found any ingredients that might be of concern, so we think this product might be OK for your hair."
      };
    case 'warning':
      return {
        color: 'error',
        bgClass: 'bg-error',
        textClass: 'text-error',
        alertClass: 'alert-error',
        alertContentClass: 'text-error-content',
        description: "We've found some ingredients that might be problematic. You may want to research these ingredients further or consider alternatives."
      };
    case 'caution':
      return {
        color: 'warning',
        bgClass: 'bg-warning',
        textClass: 'text-warning',
        alertClass: 'alert-warning',
        alertContentClass: 'text-warning-content',
        description: "Some ingredients in this product require caution. They may work for some people but could be problematic depending on your hair type and needs."
      };
    default:
      return {
        color: 'base',
        bgClass: 'bg-base-300',
        textClass: 'text-base-content',
        alertClass: 'alert-info',
        alertContentClass: 'text-info-content',
        description: "We couldn't determine the status of this product."
      };
  }
};
