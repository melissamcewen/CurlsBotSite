interface StatusConfig {
  color: string;
  description: string;
}

export const getStatusConfig = (status: string): StatusConfig => {
  switch (status) {
    case 'ok':
      return {
        color: 'success',
        description: "We haven't found any ingredients that might be of concern, so we think this product might be OK for your hair."
      };
    case 'warning':
      return {
        color: 'error',
        description: "We've found some ingredients that might be problematic. You may want to research these ingredients further or consider alternatives."
      };
    case 'caution':
      return {
        color: 'warning',
        description: "Some ingredients in this product require caution. They may work for some people but could be problematic depending on your hair type and needs."
      };
    default:
      return {
        color: 'base',
        description: "We couldn't determine the status of this product."
      };
  }
};
