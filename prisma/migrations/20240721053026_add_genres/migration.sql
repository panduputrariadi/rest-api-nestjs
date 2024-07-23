-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookGenres" (
    "bookId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookGenres_pkey" PRIMARY KEY ("bookId","genreId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- AddForeignKey
ALTER TABLE "BookGenres" ADD CONSTRAINT "BookGenres_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookGenres" ADD CONSTRAINT "BookGenres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
