/*
  Warnings:

  - You are about to drop the column `speakerId` on the `MeasurementMeta` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MeasurementMeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT,
    "measurementCaseId" INTEGER NOT NULL,
    CONSTRAINT "MeasurementMeta_measurementCaseId_fkey" FOREIGN KEY ("measurementCaseId") REFERENCES "MeasurementCases" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MeasurementMeta" ("description", "id", "measurementCaseId") SELECT "description", "id", "measurementCaseId" FROM "MeasurementMeta";
DROP TABLE "MeasurementMeta";
ALTER TABLE "new_MeasurementMeta" RENAME TO "MeasurementMeta";
CREATE UNIQUE INDEX "MeasurementMeta_measurementCaseId_key" ON "MeasurementMeta"("measurementCaseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
