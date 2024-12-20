export const capitalizeFirstLetter = (string: string) => {
  if (!string) return ''; // Handle empty strings
  return string.charAt(0).toUpperCase() + string.slice(1);
};
