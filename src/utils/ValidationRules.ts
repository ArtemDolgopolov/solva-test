export const REQUIRED_MESSAGE = 'Required field!';

export const EMAIL_VALIDATION = {
  rules: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
  message: 'Incorrect email! (e.g. example@gmail.com)'
};

export const PASSWORD_VALIDATION = {
  rules_uppercase: /(?=.*[A-Z])/,
  rules_lowercase: /(?=.*[a-z])/,
  rules_digit: /\d/,
  rules_specials: /(?=.*?[#?!@$%^&*-])/,
  message_uppercase: 'Must contain at least one uppercase letter!',
  message_lowercase: 'Must contain at least one lowercase letter!',
  message_digit: 'Must contain at least one digit!',
  message_length: 'Must be at least 8 characters long!',
  message_specials: 'Must contain at least 1 special character!'
};
