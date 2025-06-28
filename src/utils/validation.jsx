export const passwordPattern = /^(?=.*[A-Z])(?=.*\W).{8,}$/;

export const isValidPassword = (password) => {
  return passwordPattern.test(password);
};

export const isValidEmail = (email) => {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
