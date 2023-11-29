import { tags } from 'typia';
import { ParamsDictionary } from 'express-serve-static-core';

export interface EditProfileRequestValidation {
  body: EditProfileBody;
}

export interface EditProfileBody {
  profileName: string;
  profileStatus: string;
}

export interface GetProfileRequestValidation {
  params: ProfileParams;
}

export interface ProfileParams extends ParamsDictionary {
  userId: string & tags.Format<'uuid'>;
}

export interface GetProfilesRequesValidation {
  params: ProfileParams;
  body: GetProfilesBody;
}

export interface GetProfilesBody {
  searchString: string;
}
