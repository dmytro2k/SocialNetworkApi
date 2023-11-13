import { tags } from 'typia';

export interface RegisterRequestValidation {
  body: authBody;
}

export interface LoginRequestValidation {
  body: authBody;
}

export interface authBody {
  userEmail: string & tags.Format<'email'>;
  userPassword: string;
}
