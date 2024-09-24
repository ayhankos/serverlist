/*
  Warnings:

  - You are about to drop the column `price` on the `Server` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Server` DROP COLUMN `price`,
    ADD COLUMN `Rank` VARCHAR(191) NOT NULL DEFAULT '0';
