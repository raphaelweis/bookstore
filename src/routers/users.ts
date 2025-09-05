import express from "express";
import { User } from "../types";

const router = express.Router();

const users: User[] = [
  {
    id: 0,
    name: "John",
    email: "john@mail.com",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 1,
    name: "Alice",
    email: "alice@mail.com",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@mail.com",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/**
 * Get all users
 */
router.get(`/`, (_req, res) => res.send(users));

/**
 * Get a user by ID
 */
router.get(`/:userId`, (req, res) => {
  const userId = parseInt(req.params.userId);
  const userResponse = users.filter((user) => userId === user.id);

  res.send(userResponse);
});

/**
 * Add a new user
 */
router.post(`/`, (req, res) => {
  const newUser = {
    id: 3,
    name: req.body.name,
    email: req.body.email,
    created_at: new Date(),
    updated_at: new Date(),
  };
  users.push(newUser);
  res.send(newUser);
});

/**
 * Update email and name for an existing user (by ID)
 */
router.put(`/:userId`, (req, res) => {
  const userId = parseInt(req.params.userId);
  const index = users.findIndex((user) => userId === user.id);
  const userToUpdate = users[index];

  const updatedUser = {
    ...userToUpdate,
    name: req.body.email,
    email: req.body.email,
  };

  users[index] = updatedUser;
  res.send(updatedUser);
});

/**
 * Delete a user by ID
 */
router.delete(`/:userId`, (req, res) => {
  const userId = parseInt(req.params.userId);

  const index = users.findIndex((user) => userId === user.id);

  const removedUser = users[index];
  users.splice(index, 1);

  res.send(removedUser);
});

export default router;
