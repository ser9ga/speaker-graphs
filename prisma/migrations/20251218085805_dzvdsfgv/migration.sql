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
    CONSTRAINT "MeasurementFrame_measurementCaseId_fkey" FOREIGN KEY ("measurementCaseId") REFERENCES "MeasurementCases" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MeasurementFrame" ("I", "Pa", "Uin", "frequency", "id", "measurementCaseId") SELECT "I", "Pa", "Uin", "frequency", "id", "measurementCaseId" FROM "MeasurementFrame";
DROP TABLE "MeasurementFrame";
ALTER TABLE "new_MeasurementFrame" RENAME TO "MeasurementFrame";
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
    CONSTRAINT "MeasurementMeta_measurementCaseId_fkey" FOREIGN KEY ("measurementCaseId") REFERENCES "MeasurementCases" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MeasurementMeta" ("cabinetId", "carId", "description", "id", "isDoorOpened", "measurementCaseId", "portId", "speakerId", "voltageOfTesting") SELECT "cabinetId", "carId", "description", "id", "isDoorOpened", "measurementCaseId", "portId", "speakerId", "voltageOfTesting" FROM "MeasurementMeta";
DROP TABLE "MeasurementMeta";
ALTER TABLE "new_MeasurementMeta" RENAME TO "MeasurementMeta";
CREATE UNIQUE INDEX "MeasurementMeta_measurementCaseId_key" ON "MeasurementMeta"("measurementCaseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
