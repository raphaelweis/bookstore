import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
import { BookstoreError } from "../middlewares/errors";
import prisma from "../prismaClient";
import {
  BillItemCreate,
  BillItemUpdate,
  BillUpdate,
  HTTPErrorCodes,
  PRISMA_ERROR_CODES,
} from "../types";

// We want to include these BillItems fields in every response containing Bill objects.
const includeBillItems = {
  select: {
    id: true,
    book_id: true,
    quantity: true,
  },
};

export async function getAllBills() {
  return await prisma.bill.findMany({
    include: { billItems: includeBillItems },
  });
}

export async function getBillById(billId: number) {
  const bill = await prisma.bill.findUnique({
    where: { id: billId },
    include: { billItems: includeBillItems },
  });

  if (!bill) {
    throw new BookstoreError(
      HTTPErrorCodes.NOT_FOUND,
      `Bill with id: '${billId}' was not found.`,
    );
  }

  return bill;
}

export async function updateBill(billId: number, data: BillUpdate) {
  try {
    return await prisma.bill.update({
      where: { id: billId },
      data: { ...data, updated_at: new Date() },
      include: { billItems: includeBillItems },
    });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === PRISMA_ERROR_CODES.NOT_FOUND
    ) {
      throw new BookstoreError(
        HTTPErrorCodes.NOT_FOUND,
        `Bill with id: '${billId}' was not found`,
      );
    } else throw e;
  }
}

export async function deleteBill(billId: number) {
  try {
    return await prisma.bill.delete({
      where: { id: billId },
      include: { billItems: includeBillItems },
    });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === PRISMA_ERROR_CODES.NOT_FOUND
    ) {
      throw new BookstoreError(
        HTTPErrorCodes.NOT_FOUND,
        `Bill with id: '${billId}' was not found`,
      );
    } else throw e;
  }
}

export async function addBillItem(billId: number, data: BillItemCreate) {
  try {
    await prisma.billItem.create({
      data: {
        bill_id: billId,
        ...data,
      },
    });
    return await prisma.bill.update({
      where: { id: billId },
      data: { updated_at: new Date() },
      include: { billItems: includeBillItems },
    });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === PRISMA_ERROR_CODES.FOREIGN_KEY_NOT_FOUND
    ) {
      throw new BookstoreError(
        HTTPErrorCodes.NOT_FOUND,
        `Bill with id: '${billId}' was not found`,
      );
    } else throw e;
  }
}

export async function updateBillItem(
  billId: number,
  billItemId: number,
  data: BillItemUpdate,
) {
  try {
    await prisma.billItem.update({
      where: { id: billItemId },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
    return await prisma.bill.update({
      where: { id: billId },
      data: { updated_at: new Date() },
      include: { billItems: includeBillItems },
    });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === PRISMA_ERROR_CODES.NOT_FOUND
    ) {
      switch (e.meta?.modelName) {
        case "Bill": {
          throw new BookstoreError(
            HTTPErrorCodes.NOT_FOUND,
            `Bill with id: '${billId}' was not found`,
          );
        }
        case "BillItem": {
          throw new BookstoreError(
            HTTPErrorCodes.NOT_FOUND,
            `BillItem with id: '${billItemId}' was not found`,
          );
        }
      }
    } else throw e;
  }
}

export async function deleteBillItem(billId: number, billItemId: number) {
  try {
    await prisma.billItem.delete({ where: { id: billItemId } });
    return await prisma.bill.update({
      where: { id: billId },
      data: { updated_at: new Date() },
      include: { billItems: includeBillItems },
    });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === PRISMA_ERROR_CODES.NOT_FOUND
    ) {
      switch (e.meta?.modelName) {
        case "Bill": {
          throw new BookstoreError(
            HTTPErrorCodes.NOT_FOUND,
            `Bill with id: '${billId}' was not found`,
          );
        }
        case "BillItem": {
          throw new BookstoreError(
            HTTPErrorCodes.NOT_FOUND,
            `BillItem with id: '${billItemId}' was not found`,
          );
        }
      }
    } else throw e;
  }
}
