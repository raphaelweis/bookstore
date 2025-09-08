import express from "express";
import {
  BillItemCreate,
  BillItemUpdate,
  BillUpdate,
  BookCreate,
  BookUpdate,
} from "../types";
import * as billsRepository from "../repositories/bills";
import { resolve } from "path";
import { rmSync } from "fs";

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
 * Delete a bill. Also deletes all the associated BillItems.
 */
router.delete(`/:billId`, async (req, res, next) => {
  const billId = parseInt(req.params.billId);

  billsRepository
    .deleteBill(billId)
    .then((deletedBill) => res.send(deletedBill))
    .catch(next);
});

/**
 * Add a bill item for an existing bill.
 */
router.post(`/:billId/billItems`, async (req, res, next) => {
  const billId = parseInt(req.params.billId);
  const newBillItemData: BillItemCreate = req.body;

  billsRepository
    .addBillItem(billId, newBillItemData)
    .then((updatedBill) => res.send(updatedBill))
    .catch(next);
});

/**
 * Update one bill item for an existing bill.
 */
router.patch(`/:billId/billItems/:billItemId`, async (req, res, next) => {
  const billId = parseInt(req.params.billId);
  const billItemId = parseInt(req.params.billItemId);
  const dataToUpdate: BillItemUpdate = req.body;

  billsRepository
    .updateBillItem(billId, billItemId, dataToUpdate)
    .then((updatedBill) => res.send(updatedBill))
    .catch(next);
});

/**
 * Delete a bill item for an existing bill.
 */
router.delete(`/:billId/billItems/:billItemId`, async (req, res, next) => {
  const billId = parseInt(req.params.billId);
  const billItemId = parseInt(req.params.billItemId);

  billsRepository
    .deleteBillItem(billId, billItemId)
    .then((updatedBill) => res.send(updatedBill))
    .catch(next);
});

export default router;
