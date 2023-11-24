export const upperCaseFirst = (str) => {
  return str?.toLowerCase().charAt(0).toUpperCase() + str?.slice(1);
};

export const isStringALink = (str) => {
  return str?.includes("http");
};
