/*
  Warnings:

  - You are about to drop the column `status` on the `Book` table. All the data in the column will be lost.
  - Added the required column `readingStatusId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "status",
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "readingStatusId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ReadingStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ReadingStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadingStatus_name_key" ON "ReadingStatus"("name");

-- CreateIndex
CREATE INDEX "Book_readingStatusId_idx" ON "Book"("readingStatusId");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_readingStatusId_fkey" FOREIGN KEY ("readingStatusId") REFERENCES "ReadingStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
