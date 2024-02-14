/*
  Warnings:

  - You are about to drop the `SochlengeKuch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SochlengeKuch";

-- CreateTable
CREATE TABLE "LocMetrics" (
    "id" TEXT NOT NULL,
    "campusName" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "lumen" BOOLEAN NOT NULL DEFAULT false,
    "peopleCount" INTEGER NOT NULL DEFAULT 0,
    "avgSpeed" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "riskRating" INTEGER NOT NULL DEFAULT 0,
    "color" TEXT NOT NULL DEFAULT 'yellow',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LocMetrics_campusName_key" ON "LocMetrics"("campusName");
