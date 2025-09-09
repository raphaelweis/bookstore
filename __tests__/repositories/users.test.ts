import * as userRepository from "../../src/repositories/users";
import { prismaMock } from "../../src/singleton";

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
