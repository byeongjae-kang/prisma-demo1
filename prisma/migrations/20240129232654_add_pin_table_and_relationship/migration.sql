-- CreateTable
CREATE TABLE "pins" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(500) NOT NULL,

    CONSTRAINT "pins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BoardToPin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BoardToPin_AB_unique" ON "_BoardToPin"("A", "B");

-- CreateIndex
CREATE INDEX "_BoardToPin_B_index" ON "_BoardToPin"("B");

-- AddForeignKey
ALTER TABLE "_BoardToPin" ADD CONSTRAINT "_BoardToPin_A_fkey" FOREIGN KEY ("A") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardToPin" ADD CONSTRAINT "_BoardToPin_B_fkey" FOREIGN KEY ("B") REFERENCES "pins"("id") ON DELETE CASCADE ON UPDATE CASCADE;
