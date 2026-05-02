export interface AuthUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: string;
}

export interface SignInFormValues {
  email: string;
  password: string;
}
