export const isNumber = (input: string): boolean => {
  return /^\d+(\.\d+)?$/.test(input);
}
