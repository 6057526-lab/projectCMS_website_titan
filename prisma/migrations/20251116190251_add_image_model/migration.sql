-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "blockId" TEXT,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "alt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Image_blockId_idx" ON "Image"("blockId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE CASCADE ON UPDATE CASCADE;
