export const emailValidator = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const passwordValidator = (password: string) => {
  return password.length >= 8;
};