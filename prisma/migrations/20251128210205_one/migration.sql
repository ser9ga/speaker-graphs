/*
  Warnings:

  - You are about to drop the column `cabinetsId` on the `MeasurementMeta` table. All the data in the column will be lost.
  - You are about to drop the column `carsId` on the `MeasurementMeta` table. All the data in the column will be lost.
  - You are about to drop the column `portsId` on the `MeasurementMeta` table. All the data in the column will be lost.
  - You are about to drop the column `speakersId` on the `MeasurementMeta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[volume,speakerSize]` on the table `Cabinets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[diameter,length]` on the table `Ports` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cabinetId` to the `MeasurementMeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carId` to the `MeasurementMeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portId` to the `MeasurementMeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speakerId` to the `MeasurementMeta` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cabinets_volume_key";

-- DropIndex
DROP INDEX "Ports_diameter_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MeasurementMeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isDoorOpened" BOOLEAN NOT NULL,
    "voltageOfTesting" DECIMAL NOT NULL,
    "description" TEXT,
    "measurementCaseId" INTEGER NOT NULL,
    "speakerId" INTEGER NOT NULL,
    "cabinetId" INTEGER NOT NULL,
    "portId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    CONSTRAINT "MeasurementMeta_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speakers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasurementMeta_cabinetId_fkey" FOREIGN KEY ("cabinetId") REFERENCES "Cabinets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasurementMeta_portId_fkey" FOREIGN KEY ("portId") REFERENCES "Ports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasurementMeta_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Cars" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasurementMeta_measurementCaseId_fkey" FOREIGN KEY ("measurementCaseId") REFERENCES "MeasurementCases" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MeasurementMeta" ("description", "id", "isDoorOpened", "measurementCaseId", "voltageOfTesting") SELECT "description", "id", "isDoorOpened", "measurementCaseId", "voltageOfTesting" FROM "MeasurementMeta";
DROP TABLE "MeasurementMeta";
ALTER TABLE "new_MeasurementMeta" RENAME TO "MeasurementMeta";
CREATE UNIQUE INDEX "MeasurementMeta_measurementCaseId_key" ON "MeasurementMeta"("measurementCaseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Cabinets_volume_speakerSize_key" ON "Cabinets"("volume", "speakerSize");

-- CreateIndex
CREATE UNIQUE INDEX "Ports_diameter_length_key" ON "Ports"("diameter", "length");
