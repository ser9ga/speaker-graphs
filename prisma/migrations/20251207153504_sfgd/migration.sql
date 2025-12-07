/*
  Warnings:

  - You are about to drop the `Cabinets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MeasurementFrame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `cabinetId` on the `MeasurementMeta` table. All the data in the column will be lost.
  - You are about to drop the column `carId` on the `MeasurementMeta` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `MeasurementMeta` table. All the data in the column will be lost.
  - You are about to drop the column `isDoorOpened` on the `MeasurementMeta` table. All the data in the column will be lost.
  - You are about to drop the column `portId` on the `MeasurementMeta` table. All the data in the column will be lost.
  - You are about to drop the column `voltageOfTesting` on the `MeasurementMeta` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Cabinets_volume_speakerSize_key";

-- DropIndex
DROP INDEX "Cars_label_key";

-- DropIndex
DROP INDEX "Ports_diameter_length_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cabinets";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cars";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MeasurementFrame";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Ports";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MeasurementMeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "speakerId" INTEGER NOT NULL,
    "measurementCaseId" INTEGER NOT NULL,
    CONSTRAINT "MeasurementMeta_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speakers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasurementMeta_measurementCaseId_fkey" FOREIGN KEY ("measurementCaseId") REFERENCES "MeasurementCases" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MeasurementMeta" ("id", "measurementCaseId", "speakerId") SELECT "id", "measurementCaseId", "speakerId" FROM "MeasurementMeta";
DROP TABLE "MeasurementMeta";
ALTER TABLE "new_MeasurementMeta" RENAME TO "MeasurementMeta";
CREATE UNIQUE INDEX "MeasurementMeta_measurementCaseId_key" ON "MeasurementMeta"("measurementCaseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
