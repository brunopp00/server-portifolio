/*
  Warnings:

  - Added the required column `urlRepo` to the `Programs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlScreen` to the `Programs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Programs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "urlScreen" TEXT NOT NULL,
    "urlRepo" TEXT NOT NULL
);
INSERT INTO "new_Programs" ("description", "id", "img", "title") SELECT "description", "id", "img", "title" FROM "Programs";
DROP TABLE "Programs";
ALTER TABLE "new_Programs" RENAME TO "Programs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
