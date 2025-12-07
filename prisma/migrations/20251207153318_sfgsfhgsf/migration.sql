/*
  Warnings:

  - You are about to drop the column `qwe` on the `MeasurementCases` table. All the data in the column will be lost.
  - You are about to drop the column `speakerId` on the `MeasurementCases` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Cabinets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "volume" DECIMAL NOT NULL,
    "speakerSize" DECIMAL NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Ports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "diameter" DECIMAL NOT NULL,
    "length" DECIMAL NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "MeasurementFrame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "frequency" INTEGER NOT NULL,
    "Uin" DECIMAL NOT NULL,
    "I" DECIMAL NOT NULL,
    "Pa" DECIMAL NOT NULL,
    "measurementCaseId" INTEGER NOT NULL,
    CONSTRAINT "MeasurementFrame_measurementCaseId_fkey" FOREIGN KEY ("measurementCaseId") REFERENCES "MeasurementCases" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MeasurementMeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "speakerId" INTEGER NOT NULL,
    "cabinetId" INTEGER NOT NULL,
    "portId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    "isDoorOpened" BOOLEAN NOT NULL,
    "voltageOfTesting" DECIMAL NOT NULL,
    "description" TEXT,
    "measurementCaseId" INTEGER NOT NULL,
    CONSTRAINT "MeasurementMeta_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speakers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasurementMeta_cabinetId_fkey" FOREIGN KEY ("cabinetId") REFERENCES "Cabinets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasurementMeta_portId_fkey" FOREIGN KEY ("portId") REFERENCES "Ports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasurementMeta_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Cars" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasurementMeta_measurementCaseId_fkey" FOREIGN KEY ("measurementCaseId") REFERENCES "MeasurementCases" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MeasurementCases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_MeasurementCases" ("id") SELECT "id" FROM "MeasurementCases";
DROP TABLE "MeasurementCases";
ALTER TABLE "new_MeasurementCases" RENAME TO "MeasurementCases";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Cabinets_volume_speakerSize_key" ON "Cabinets"("volume", "speakerSize");

-- CreateIndex
CREATE UNIQUE INDEX "Ports_diameter_length_key" ON "Ports"("diameter", "length");

-- CreateIndex
CREATE UNIQUE INDEX "Cars_label_key" ON "Cars"("label");

-- CreateIndex
CREATE UNIQUE INDEX "MeasurementMeta_measurementCaseId_key" ON "MeasurementMeta"("measurementCaseId");
