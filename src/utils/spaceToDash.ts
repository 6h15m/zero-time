export const spaceToDash = (text: string) => {
  return text.replace(`%20`, "-").replace(/\s+/g, "-");
};
