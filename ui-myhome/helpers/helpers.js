export const upperCaseFirst = (str) => {
  if (!str) return "";
  return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
};

export const isStringALink = (str) => {
  if (!str) return false;
  return str.includes("http");
};
