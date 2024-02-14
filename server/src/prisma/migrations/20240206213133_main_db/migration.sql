-- CreateTable
CREATE TABLE "SochlengeKuch" (
    "id" TEXT NOT NULL,
    "campusName" TEXT NOT NULL,
    "lumen" BOOLEAN NOT NULL DEFAULT false,
    "peopleCount" INTEGER NOT NULL DEFAULT 0,
    "avgSpeed" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "riskRating" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SochlengeKuch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SochlengeKuch_campusName_key" ON "SochlengeKuch"("campusName");
