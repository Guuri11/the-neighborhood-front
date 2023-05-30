export const generateRandomDate = (): string => {
  const start = new Date(1970, 0, 1);
  const end = new Date(2005, 11, 31);
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().slice(0, 10);
};
