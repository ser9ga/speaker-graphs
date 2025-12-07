/*
  Warnings:

  - You are about to drop the `MeasurementMeta` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `measurementCaseId` to the `Speakers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MeasurementMeta_measurementCaseId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MeasurementMeta";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Speakers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "coilResistance" DECIMAL NOT NULL,
    "description" TEXT,
    "measurementCaseId" INTEGER NOT NULL,
    CONSTRAINT "Speakers_measurementCaseId_fkey" FOREIGN KEY ("measurementCaseId") REFERENCES "MeasurementCases" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Speakers" ("coilResistance", "description", "id", "label") SELECT "coilResistance", "description", "id", "label" FROM "Speakers";
DROP TABLE "Speakers";
ALTER TABLE "new_Speakers" RENAME TO "Speakers";
CREATE UNIQUE INDEX "Speakers_label_key" ON "Speakers"("label");
CREATE UNIQUE INDEX "Speakers_measurementCaseId_key" ON "Speakers"("measurementCaseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
