/*
  Warnings:

  - You are about to drop the `MeasurementMeta` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `MeasurementFrame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `MeasurementFrame` table without a default value. This is not possible if the table is not empty.

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
CREATE TABLE "new_MeasurementFrame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "frequency" INTEGER NOT NULL,
    "Uin" DECIMAL NOT NULL,
    "I" DECIMAL NOT NULL,
    "Pa" DECIMAL NOT NULL,
    "measurementCaseId" INTEGER NOT NULL,
    CONSTRAINT "MeasurementFrame_measurementCaseId_fkey" FOREIGN KEY ("measurementCaseId") REFERENCES "MeasurementCases" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MeasurementFrame" ("I", "Pa", "Uin", "frequency", "measurementCaseId") SELECT "I", "Pa", "Uin", "frequency", "measurementCaseId" FROM "MeasurementFrame";
DROP TABLE "MeasurementFrame";
ALTER TABLE "new_MeasurementFrame" RENAME TO "MeasurementFrame";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
