export interface AuthUser {
  id: string;
  email: string;
  name: string;
  shopName: string;
  phone: string;
  city: string;
}

export interface SignInFormValues {
  identifier: string;
  password: string;
}

export interface SignUpFormValues {
  shopName: string;
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  password: string;
}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}
