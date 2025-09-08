import prisma from "../prismaClient";
import { BillUpdate } from "../types";

// We want include these BillItems fields in every response containing Bill objects.
const includeBillItems = {
  select: {
    id: true,
    book_id: true,
    quantity: true,
  },
};

// TODO: error handling here also
export async function getAllBills() {
  return await prisma.bill.findMany({
    include: {
      billItems: includeBillItems,
    },
  });
}

export async function getBillById(billId: number) {
  return await prisma.bill.findUnique({
    where: { id: billId },
    include: {
      billItems: includeBillItems,
    },
  });
}

export async function updateBill(billId: number, data: BillUpdate) {
  return await prisma.bill.update({
    where: { id: billId },
    data: { ...data },
    include: {
      billItems: includeBillItems,
    },
  });
}

export async function deleteBill(billId: number) {
  return await prisma.bill.delete({
    where: { id: billId },
    include: {
      billItems: includeBillItems,
    },
  });
}
