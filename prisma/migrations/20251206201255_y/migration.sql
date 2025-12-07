/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cabinetId` to the `MeasurementMeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carId` to the `MeasurementMeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `MeasurementMeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDoorOpened` to the `MeasurementMeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portId` to the `MeasurementMeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voltageOfTesting` to the `MeasurementMeta` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Profile_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Profile";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

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
INSERT INTO "new_MeasurementMeta" ("measurementCaseId", "speakerId") SELECT "measurementCaseId", "speakerId" FROM "MeasurementMeta";
DROP TABLE "MeasurementMeta";
ALTER TABLE "new_MeasurementMeta" RENAME TO "MeasurementMeta";
CREATE UNIQUE INDEX "MeasurementMeta_measurementCaseId_key" ON "MeasurementMeta"("measurementCaseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "MeasurementFrame_measurementCaseId_key" ON "MeasurementFrame"("measurementCaseId");
