import express from "express";
import { BillUpdate, BookCreate, BookUpdate } from "../types";
import * as billsRepository from "../repositories/bills";

const router = express.Router();

/**
 * Get all bills
 */
router.get(`/`, async (_req, res, next) => {
  billsRepository
    .getAllBills()
    .then((allBills) => res.send(allBills))
    .catch(next);
});

/**
 * Get a bill by ID
 */
router.get(`/:billId`, async (req, res, next) => {
  const billId = parseInt(req.params.billId);

  billsRepository
    .getBillById(billId)
    .then((bill) => res.send(bill))
    .catch(next);
});

/**
 * Update a bill
 */
router.patch(`/:billId`, async (req, res, next) => {
  const billId = parseInt(req.params.billId);
  const dataToUpdate: BillUpdate = req.body;

  billsRepository
    .updateBill(billId, dataToUpdate)
    .then((updatedBill) => res.send(updatedBill))
    .catch(next);
});

/**
 * Delete a bill
 */
router.delete(`/:billId`, async (req, res, next) => {
  const billId = parseInt(req.params.billId);

  billsRepository
    .deleteBill(billId)
    .then((deletedBill) => res.send(deletedBill))
    .catch(next);
});

export default router;
