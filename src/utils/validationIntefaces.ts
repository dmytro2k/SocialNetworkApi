import { tags } from "typia";

export interface RegisterRequestValidation {
  body: {
    name: string
    email: string & tags.Format<"email">
    password: string
  }
}

export interface LoginRequestValidation {
  body: {
    email: string & tags.Format<'email'>
    password: string
  }
}

export interface CreatePostRequestValidation {
  body: {
    title: string
    content: string
  }
}

export interface UpdatePostRequestValidation {
  body: {
    id: string & tags.Format<'uuid'>
    title?: string
    content?: string
  }
}

export interface DeletePostRequestValidation {
  body: {
    id: string & tags.Format<'uuid'>
  }
}

export interface GetUserWithPostsRequestValidation {
  params: {
    id: string & tags.Format<'uuid'>
  }
}


