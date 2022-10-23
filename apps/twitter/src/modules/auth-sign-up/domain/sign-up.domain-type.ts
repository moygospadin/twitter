export interface CreateSignUpValidationParameters {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface DeleteSignUpValidationParameters {
  email: string;
}

export interface GetSignUpValidationParameters {
  email: string;
}
