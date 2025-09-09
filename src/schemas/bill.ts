import z from "zod";

export const BillItemCreateSchema = z.object({
  book_id: z.int(),
  quantity: z.int(),
});

export const BillItemUpdateSchema = BillItemCreateSchema.partial();

export const BillCreateSchema = z.object({
  billing_address: z.string(),
  books: z.array(BillItemCreateSchema),
});

export const BillUpdateSchema = BillCreateSchema.partial({
  billing_address: true,
});

export type BillItemCreate = z.infer<typeof BillItemCreateSchema>;
export type BillItemUpdate = z.infer<typeof BillItemUpdateSchema>;
export type BillCreate = z.infer<typeof BillCreateSchema>;
export type BillUpdate = z.infer<typeof BillUpdateSchema>;
