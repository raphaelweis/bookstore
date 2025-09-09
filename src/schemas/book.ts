import z from "zod";

const stringToDate = z.codec(z.iso.date(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
});

export const BookCreateSchema = z.object({
  title: z.string(),
  author: z.string(),
  price: z.number(),
  publishing_date: stringToDate,
});

export const BookUpdateSchema = BookCreateSchema.partial();

export type BookCreate = z.infer<typeof BookCreateSchema>;
export type BookUpdate = z.infer<typeof BookUpdateSchema>;
