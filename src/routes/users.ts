import express from "express";

const router = express.Router();

interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

const users: User[] = [
  {
    id: 0,
    name: "John",
    email: "john@mail.com",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 0,
    name: "Alice",
    email: "alice@mail.com",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 0,
    name: "Bob",
    email: "bob@mail.com",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

router.get(`/`, (_req, res) => {
  res.send(users);
});

export default router;
