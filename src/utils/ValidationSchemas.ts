import { InferType, object, ref, string } from 'yup';
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  REQUIRED_MESSAGE
} from './ValidationRules';

const signInSchema = object({
  email: string()
    .required(REQUIRED_MESSAGE)
    .email(EMAIL_VALIDATION.message)
    .matches(EMAIL_VALIDATION.rules, EMAIL_VALIDATION.message),
  password: string()
    .required(REQUIRED_MESSAGE)
    .matches(PASSWORD_VALIDATION.rules_lowercase, {
      message: PASSWORD_VALIDATION.message_lowercase
    })
    .matches(PASSWORD_VALIDATION.rules_uppercase, {
      message: PASSWORD_VALIDATION.message_uppercase
    })
    .matches(PASSWORD_VALIDATION.rules_digit, {
      message: PASSWORD_VALIDATION.message_digit
    })
    .matches(PASSWORD_VALIDATION.rules_specials, {
      message: PASSWORD_VALIDATION.message_specials
    })
    .min(8, PASSWORD_VALIDATION.message_length)
});

const signUpSchema = signInSchema.concat(
  object({
    passwordConfirm: string()
      .oneOf([ref('password')], 'Passwords must match')
      .required('please confirm you password')
  })
);

export type SignUpForm = InferType<typeof signUpSchema>;
export type SignInForm = InferType<typeof signInSchema>;

export { signUpSchema, signInSchema };
