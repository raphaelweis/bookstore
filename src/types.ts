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

export interface BillCreate {
  billing_address: string;
  books: BillItemCreate[];
}

export type BillUpdate = Partial<Omit<BillCreate, "books">>;

export interface BillItemCreate {
  book_id: number;
  quantity: number;
}

export type BillItemUpdate = Partial<BillItemCreate>;

export enum ErrorCodes {
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}
