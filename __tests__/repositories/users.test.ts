import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
import { BookstoreError } from "../../src/middlewares/errors";
import * as userRepository from "../../src/repositories/users";
import { prismaMock } from "../../src/singleton";
import { HTTPErrorCodes } from "../../src/types";

test("should create a new user", async () => {
  const now = new Date();
  const createUserData = {
    name: "Raph",
    email: "raph@mail.com",
  };
  const mockUser = {
    id: 1,
    name: "Raph",
    email: "raph@mail.com",
    created_at: now,
    updated_at: now,
  };

  prismaMock.user.create.mockResolvedValue(mockUser);

  await expect(userRepository.addUser(createUserData)).resolves.toEqual({
    id: 1,
    name: "Raph",
    email: "raph@mail.com",
    created_at: now,
    updated_at: now,
  });
});

test("should fail when the email is already in the database", async () => {
  const createUserData = {
    name: "Raph",
    email: "raph@mail.com", // This email is supposed to exist already
  };

  const mockError = new PrismaClientKnownRequestError(
    "A user with email: 'raph@mail.com' already exists.",
    {
      code: "P2002",
      clientVersion: "x.y.z",
      meta: {
        target: ["email"],
      },
    },
  );

  prismaMock.user.create.mockRejectedValue(mockError);

  await expect(userRepository.addUser(createUserData)).rejects.toThrow(
    new BookstoreError(
      HTTPErrorCodes.CONFLICT,
      `A user with email: 'raph@mail.com' already exists.`,
    ),
  );
});
