/*
  Warnings:

  - The primary key for the `MeasurementFrame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MeasurementFrame` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MeasurementFrame" (
    "frequency" INTEGER NOT NULL,
    "Uin" DECIMAL NOT NULL,
    "I" DECIMAL NOT NULL,
    "Pa" DECIMAL NOT NULL,
    "measurementCaseId" INTEGER NOT NULL,

    PRIMARY KEY ("measurementCaseId", "frequency"),
    CONSTRAINT "MeasurementFrame_measurementCaseId_fkey" FOREIGN KEY ("measurementCaseId") REFERENCES "MeasurementCases" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MeasurementFrame" ("I", "Pa", "Uin", "frequency", "measurementCaseId") SELECT "I", "Pa", "Uin", "frequency", "measurementCaseId" FROM "MeasurementFrame";
DROP TABLE "MeasurementFrame";
ALTER TABLE "new_MeasurementFrame" RENAME TO "MeasurementFrame";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
