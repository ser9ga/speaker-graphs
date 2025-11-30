-- CreateTable
CREATE TABLE "Cabinets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "volume" DECIMAL NOT NULL,
    "speakerSize" DECIMAL NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Ports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "diameter" DECIMAL NOT NULL,
    "length" DECIMAL NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "description" TEXT
);
