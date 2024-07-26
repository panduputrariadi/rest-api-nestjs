/*
  Warnings:

  - Added the required column `height` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedAt` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPages` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "publishedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "publisher" TEXT NOT NULL,
ADD COLUMN     "totalPages" INTEGER NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL;
