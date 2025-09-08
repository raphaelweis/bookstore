-- DropForeignKey
ALTER TABLE "public"."BillItem" DROP CONSTRAINT "BillItem_bill_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."BillItem" ADD CONSTRAINT "BillItem_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "public"."Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
