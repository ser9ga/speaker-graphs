/*
  Warnings:

  - You are about to alter the column `coilResistance` on the `Speakers` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Speakers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "coilResistance" DECIMAL NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Speakers" ("coilResistance", "description", "id", "label") SELECT "coilResistance", "description", "id", "label" FROM "Speakers";
DROP TABLE "Speakers";
ALTER TABLE "new_Speakers" RENAME TO "Speakers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
