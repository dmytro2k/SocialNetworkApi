import { tags } from 'typia';
import { ParamsDictionary } from 'express-serve-static-core';

export interface UpdateMyProfileRequestValidation {
  body: UpdateMyProfileBody;
}

export interface UpdateMyProfileBody {
  profileName?: string;
  profileStatus?: string;
}

export interface GetProfileRequestValidation {
  params: GetProfileParams;
}

export interface GetProfileParams extends ParamsDictionary {
  userId: string & tags.Format<'uuid'>;
}

export interface GetProfilesRequesValidation {
  body: GetProfilesBody;
}

export interface GetProfilesBody {
  searchString: string;
}
