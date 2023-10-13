/*
  Warnings:

  - You are about to drop the `TechProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TechProject` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Tech` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TechProject" DROP CONSTRAINT "TechProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TechProject" DROP CONSTRAINT "TechProject_techId_fkey";

-- DropForeignKey
ALTER TABLE "_TechProject" DROP CONSTRAINT "_TechProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_TechProject" DROP CONSTRAINT "_TechProject_B_fkey";

-- DropTable
DROP TABLE "TechProject";

-- DropTable
DROP TABLE "_TechProject";

-- CreateTable
CREATE TABLE "_ProjectToTech" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTech_AB_unique" ON "_ProjectToTech"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTech_B_index" ON "_ProjectToTech"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Tech_name_key" ON "Tech"("name");

-- AddForeignKey
ALTER TABLE "_ProjectToTech" ADD CONSTRAINT "_ProjectToTech_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTech" ADD CONSTRAINT "_ProjectToTech_B_fkey" FOREIGN KEY ("B") REFERENCES "Tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;
