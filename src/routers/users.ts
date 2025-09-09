import express from "express";
import * as userRepository from "../repositories/users";
import { requestValidator } from "../middlewares/requestValidator";
import { BillCreate, BillCreateSchema, UserCreate, UserCreateSchema, UserUpdate, UserUpdateSchema } from "../schemas/user";

const router = express.Router();

/**
 * Get all users
 */
router.get(`/`, (_req, res, next) => {
  userRepository
    .getAllUsers()
    .then((allUsers) => res.send(allUsers))
    .catch(next);
});

/**
 * Get a user by ID
 */
router.get(`/:userId`, (req, res, next) => {
  const userId = parseInt(req.params.userId);
  userRepository
    .getUserById(userId)
    .then((user) => res.send(user))
    .catch(next);
});

/**
 * Add a new user
 */
router.post(`/`, requestValidator(UserCreateSchema), (req, res, next) => {
  const newUserData: UserCreate = req.body;

  userRepository
    .addUser(newUserData)
    .then((newUser) => res.send(newUser))
    .catch(next);
});

/**
 * Update the data for an existing user (by ID)
 */
router.patch(`/:userId`, requestValidator(UserUpdateSchema), (req, res, next) => {
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
router.delete(`/:userId`, (req, res, next) => {
  const userId = parseInt(req.params.userId);

  userRepository
    .deleteUser(userId)
    .then((deletedUser) => res.send(deletedUser))
    .catch(next);
});

/**
 * Purchase some books. This represents one user buying any amount of books. It generates
 * a bill which is stored and sent back in the response.
 */
router.post(`/:userId/purchase`, requestValidator(BillCreateSchema), (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const purchaseData: BillCreate = req.body;

  userRepository
    .newPurchase(userId, purchaseData)
    .then((createdBill) => res.send(createdBill))
    .catch(next);
});

export default router;
