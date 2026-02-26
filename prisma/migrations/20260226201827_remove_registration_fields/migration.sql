/*
  Warnings:

  - You are about to drop the column `classInfo` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `studentRep1Name` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `studentRep2Name` on the `Registration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "classInfo",
DROP COLUMN "studentRep1Name",
DROP COLUMN "studentRep2Name";
