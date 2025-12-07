/*
  Warnings:

  - You are about to drop the column `measurementCaseId` on the `Speakers` table. All the data in the column will be lost.
  - Added the required column `speakerId` to the `MeasurementCases` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MeasurementCases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "speakerId" INTEGER NOT NULL,
    "qwe" TEXT,
    CONSTRAINT "MeasurementCases_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speakers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MeasurementCases" ("id", "qwe") SELECT "id", "qwe" FROM "MeasurementCases";
DROP TABLE "MeasurementCases";
ALTER TABLE "new_MeasurementCases" RENAME TO "MeasurementCases";
CREATE TABLE "new_Speakers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "coilResistance" DECIMAL NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Speakers" ("coilResistance", "description", "id", "label") SELECT "coilResistance", "description", "id", "label" FROM "Speakers";
DROP TABLE "Speakers";
ALTER TABLE "new_Speakers" RENAME TO "Speakers";
CREATE UNIQUE INDEX "Speakers_label_key" ON "Speakers"("label");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
