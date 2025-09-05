import express from "express";
import { UserCreate, UserUpdate } from "../types";
import * as userRepository from "../repositories/users";

const router = express.Router();

/**
 * Get all users
 */
router.get(`/`, async (_req, res) => {
  const allUsers = await userRepository.getAllUsers();
  res.send(allUsers);
});

/**
 * Get a user by ID
 */
router.get(`/:userId`, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await userRepository.getUserById(userId);

  res.send(user);
});

/**
 * Add a new user
 */
router.post(`/`, async (req, res) => {
  const newUserData: UserCreate = req.body;

  const newUser = await userRepository.addUser(newUserData);

  res.send(newUser);
});

/**
 * Update the data for an existing user (by ID)
 */
router.patch(`/:userId`, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const dataToUpdate: UserUpdate = req.body;

  const updatedUser = await userRepository.updateUser(userId, dataToUpdate);

  res.send(updatedUser);
});

/**
 * Delete a user by ID
 */
router.delete(`/:userId`, async (req, res) => {
  const userId = parseInt(req.params.userId);

  const deletedUser = await userRepository.deleteUser(userId);

  res.send(deletedUser)
});

export default router;
