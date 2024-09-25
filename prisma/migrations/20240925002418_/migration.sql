/*
  Warnings:

  - Added the required column `link` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Server` ADD COLUMN `link` VARCHAR(191) NOT NULL;
