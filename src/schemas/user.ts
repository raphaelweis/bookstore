import * as z from "zod";

export const UserCreateSchema = z.object({
  name: z.string(),
  email: z.email(),
});

export const UserUpdateSchema = UserCreateSchema.partial();

export const BillItemCreateSchema = z.object({
  book_id: z.int(),
  quantity: z.int(),
});

export const BillCreateSchema = z.object({
  billing_address: z.string(),
  books: z.array(BillItemCreateSchema),
});

export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type BillItemCreate = z.infer<typeof BillItemCreateSchema>;
export type BillCreate = z.infer<typeof BillCreateSchema>;
