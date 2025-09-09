import * as z from "zod";

export const UserCreateSchema = z.object({
  name: z.string(),
  email: z.email(),
});

export const UserUpdateSchema = UserCreateSchema.partial();

export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
