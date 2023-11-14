import { tags } from 'typia';

export interface AuthRequestValidation {
  body: authBody;
}

export interface AuthRequestValidation {
  body: authBody;
}

export interface authBody {
  userEmail: string & tags.Format<'email'>;
  userPassword: string;
}
