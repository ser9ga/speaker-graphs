/*
  Warnings:

  - Added the required column `size` to the `Speakers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Speakers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "size" DECIMAL NOT NULL,
    "coilResistance" DECIMAL NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Speakers" ("coilResistance", "description", "id", "label") SELECT "coilResistance", "description", "id", "label" FROM "Speakers";
DROP TABLE "Speakers";
ALTER TABLE "new_Speakers" RENAME TO "Speakers";
CREATE UNIQUE INDEX "Speakers_label_key" ON "Speakers"("label");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
