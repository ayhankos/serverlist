/*
  Warnings:

  - You are about to drop the column `slug` on the `Server` table. All the data in the column will be lost.
  - Added the required column `price` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Server_slug_key` ON `Server`;

-- AlterTable
ALTER TABLE `Server` DROP COLUMN `slug`,
    ADD COLUMN `price` VARCHAR(191) NOT NULL;
