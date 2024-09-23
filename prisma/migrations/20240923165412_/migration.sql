/*
  Warnings:

  - You are about to drop the column `feature` on the `Server` table. All the data in the column will be lost.
  - You are about to alter the column `vip` on the `Server` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - Added the required column `serverType` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Server` DROP COLUMN `feature`,
    ADD COLUMN `serverType` VARCHAR(191) NOT NULL,
    MODIFY `vip` VARCHAR(191) NOT NULL;
