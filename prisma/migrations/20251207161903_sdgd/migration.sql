/*
  Warnings:

  - Added the required column `cabinetId` to the `MeasurementMeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carId` to the `MeasurementMeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portId` to the `MeasurementMeta` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MeasurementFrame_measurementCaseId_key";

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

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MeasurementMeta" (
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
INSERT INTO "new_MeasurementMeta" ("description", "id", "isDoorOpened", "measurementCaseId", "speakerId", "voltageOfTesting") SELECT "description", "id", "isDoorOpened", "measurementCaseId", "speakerId", "voltageOfTesting" FROM "MeasurementMeta";
DROP TABLE "MeasurementMeta";
ALTER TABLE "new_MeasurementMeta" RENAME TO "MeasurementMeta";
CREATE UNIQUE INDEX "MeasurementMeta_measurementCaseId_key" ON "MeasurementMeta"("measurementCaseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Cabinets_volume_speakerSize_key" ON "Cabinets"("volume", "speakerSize");

-- CreateIndex
CREATE UNIQUE INDEX "Ports_diameter_length_key" ON "Ports"("diameter", "length");

-- CreateIndex
CREATE UNIQUE INDEX "Cars_label_key" ON "Cars"("label");
