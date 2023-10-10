-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Role" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "githubLink" TEXT NOT NULL,
    "projectLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tech" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechProject" (
    "id" TEXT NOT NULL,
    "techId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "TechProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TechProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tech_id_key" ON "Tech"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TechProject_id_key" ON "TechProject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_TechProject_AB_unique" ON "_TechProject"("A", "B");

-- CreateIndex
CREATE INDEX "_TechProject_B_index" ON "_TechProject"("B");

-- AddForeignKey
ALTER TABLE "TechProject" ADD CONSTRAINT "TechProject_techId_fkey" FOREIGN KEY ("techId") REFERENCES "Tech"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechProject" ADD CONSTRAINT "TechProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TechProject" ADD CONSTRAINT "_TechProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TechProject" ADD CONSTRAINT "_TechProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;
