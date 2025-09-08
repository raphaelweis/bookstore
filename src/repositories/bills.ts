import prisma from "../prismaClient";
import { BillItemCreate, BillItemUpdate, BillUpdate } from "../types";

// We want to include these BillItems fields in every response containing Bill objects.
const includeBillItems = {
  select: {
    id: true,
    book_id: true,
    quantity: true,
  },
};

// TODO: error handling here also
export async function getAllBills() {
  return prisma.bill.findMany({
    include: { billItems: includeBillItems },
  });
}

export async function getBillById(billId: number) {
  return prisma.bill.findUnique({
    where: { id: billId },
    include: { billItems: includeBillItems },
  });
}

export async function updateBill(billId: number, data: BillUpdate) {
  return prisma.bill.update({
    where: { id: billId },
    data: { ...data, updated_at: new Date() },
    include: { billItems: includeBillItems },
  });
}

export async function deleteBill(billId: number) {
  return prisma.bill.delete({
    where: { id: billId },
    include: { billItems: includeBillItems },
  });
}

export async function addBillItem(billId: number, data: BillItemCreate) {
  await prisma.billItem.create({
    data: {
      bill_id: billId,
      ...data,
    },
  });
  return prisma.bill.update({
    where: { id: billId },
    data: { updated_at: new Date() },
    include: { billItems: includeBillItems },
  });
}

export async function updateBillItem(
  billId: number,
  billItemId: number,
  data: BillItemUpdate,
) {
  await prisma.billItem.update({
    where: { id: billItemId },
    data: {
      ...data,
      updated_at: new Date(),
    },
  });
  return prisma.bill.update({
    where: { id: billId },
    data: { updated_at: new Date() },
    include: { billItems: includeBillItems },
  });
}

export async function deleteBillItem(billId: number, billItemId: number) {
  await prisma.billItem.delete({ where: { id: billItemId } });
  return prisma.bill.update({
    where: { id: billId },
    data: { updated_at: new Date() },
    include: { billItems: includeBillItems },
  });
}
