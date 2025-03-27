export type LoginError = {
  message: string;
  emailError: boolean;
  passwordError: boolean;
} | null;
