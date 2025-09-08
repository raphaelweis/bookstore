import express from "express";
import { UserCreate, UserUpdate } from "../types";
import * as userRepository from "../repositories/users";

const router = express.Router();

/**
 * Get all users
 */
router.get(`/`, async (_req, res, next) => {
  userRepository
    .getAllUsers()
    .then((allUsers) => res.send(allUsers))
    .catch(next);
});

/**
 * Get a user by ID
 */
router.get(`/:userId`, async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  userRepository
    .getUserById(userId)
    .then((user) => res.send(user))
    .catch(next);
});

/**
 * Add a new user
 */
router.post(`/`, async (req, res, next) => {
  const newUserData: UserCreate = req.body;

  userRepository
    .addUser(newUserData)
    .then((newUser) => res.send(newUser))
    .catch(next);
});

/**
 * Update the data for an existing user (by ID)
 */
router.patch(`/:userId`, async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const dataToUpdate: UserUpdate = req.body;

  userRepository
    .updateUser(userId, dataToUpdate)
    .then((updatedUser) => res.send(updatedUser))
    .catch(next);
});

/**
 * Delete a user by ID
 */
router.delete(`/:userId`, async (req, res, next) => {
  const userId = parseInt(req.params.userId);

  userRepository
    .deleteUser(userId)
    .then((deletedUser) => res.send(deletedUser))
    .catch(next);
});

export default router;
