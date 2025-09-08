export interface UserCreate {
  name: string;
  email: string;
}

export interface UserUpdate {
  name?: string;
  email?: string;
}

export enum ErrorCodes {
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}
