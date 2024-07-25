-- CreateTable
CREATE TABLE "ImageBook" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ImageBook_bookId_idx" ON "ImageBook"("bookId");

-- AddForeignKey
ALTER TABLE "ImageBook" ADD CONSTRAINT "ImageBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
