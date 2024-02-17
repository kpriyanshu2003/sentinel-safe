-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocMetrics" (
    "id" TEXT NOT NULL,
    "campusName" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "longitude" DECIMAL(65,30) NOT NULL DEFAULT 0,
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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LocMetrics_campusName_key" ON "LocMetrics"("campusName");
