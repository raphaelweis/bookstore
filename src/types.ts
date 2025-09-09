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

export enum HTTPErrorCodes {
  NOT_FOUND = 404,
  CONFLICT = 409,
  SERVER_ERROR = 500,
}

export enum PRISMA_ERROR_CODES {
  NOT_FOUND = "P2025",
  FOREIGN_KEY_NOT_FOUND = "P2003",
  CONFLICT = "P2002",
}
