/*
  Warnings:

  - A unique constraint covering the columns `[volume]` on the table `Cabinets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `Cars` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[diameter]` on the table `Ports` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `Speakers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "MeasurementFrame" (
    "frequency" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Uin" DECIMAL NOT NULL,
    "I" DECIMAL NOT NULL,
    "Pa" DECIMAL NOT NULL,
    "measurementCaseId" INTEGER NOT NULL,
    CONSTRAINT "MeasurementFrame_measurementCaseId_fkey" FOREIGN KEY ("measurementCaseId") REFERENCES "MeasurementCases" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MeasurementMeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isDoorOpened" BOOLEAN NOT NULL,
    "voltageOfTesting" DECIMAL NOT NULL,
    "description" TEXT,
    "measurementCaseId" INTEGER NOT NULL,
    "speakersId" INTEGER NOT NULL,
    "cabinetsId" INTEGER NOT NULL,
    "portsId" INTEGER NOT NULL,
    "carsId" INTEGER NOT NULL,
    CONSTRAINT "MeasurementMeta_speakersId_fkey" FOREIGN KEY ("speakersId") REFERENCES "Speakers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasurementMeta_cabinetsId_fkey" FOREIGN KEY ("cabinetsId") REFERENCES "Cabinets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasurementMeta_portsId_fkey" FOREIGN KEY ("portsId") REFERENCES "Ports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasurementMeta_carsId_fkey" FOREIGN KEY ("carsId") REFERENCES "Cars" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasurementMeta_measurementCaseId_fkey" FOREIGN KEY ("measurementCaseId") REFERENCES "MeasurementCases" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MeasurementCases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateIndex
CREATE UNIQUE INDEX "MeasurementMeta_measurementCaseId_key" ON "MeasurementMeta"("measurementCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Cabinets_volume_key" ON "Cabinets"("volume");

-- CreateIndex
CREATE UNIQUE INDEX "Cars_label_key" ON "Cars"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Ports_diameter_key" ON "Ports"("diameter");

-- CreateIndex
CREATE UNIQUE INDEX "Speakers_label_key" ON "Speakers"("label");
