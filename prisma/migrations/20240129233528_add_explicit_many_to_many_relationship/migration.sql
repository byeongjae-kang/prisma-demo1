/*
  Warnings:

  - You are about to drop the `_BoardToPin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BoardToPin" DROP CONSTRAINT "_BoardToPin_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardToPin" DROP CONSTRAINT "_BoardToPin_B_fkey";

-- DropTable
DROP TABLE "_BoardToPin";

-- CreateTable
CREATE TABLE "board_pins" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "pinId" INTEGER NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "board_pins_pkey" PRIMARY KEY ("pinId","boardId")
);

-- AddForeignKey
ALTER TABLE "board_pins" ADD CONSTRAINT "board_pins_pinId_fkey" FOREIGN KEY ("pinId") REFERENCES "pins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_pins" ADD CONSTRAINT "board_pins_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
