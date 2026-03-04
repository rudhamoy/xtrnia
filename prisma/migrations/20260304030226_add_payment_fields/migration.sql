/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Registration` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentGateway" AS ENUM ('RAZORPAY');

-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "transactionId",
ADD COLUMN     "paymentAmount" INTEGER,
ADD COLUMN     "paymentCurrency" TEXT NOT NULL DEFAULT 'INR',
ADD COLUMN     "paymentError" TEXT,
ADD COLUMN     "paymentGateway" "PaymentGateway" NOT NULL DEFAULT 'RAZORPAY',
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "paymentOrderId" TEXT,
ADD COLUMN     "paymentPaidAt" TIMESTAMP(3),
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
