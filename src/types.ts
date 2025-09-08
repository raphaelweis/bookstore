export interface UserCreate {
  name: string;
  email: string;
}

export type UserUpdate = Partial<UserCreate>;

export interface BookCreate {
  price: number;
  publishing_date: Date;
  author: string;
  title: string;
}

export type BookUpdate = Partial<BookCreate>;

export enum ErrorCodes {
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}
