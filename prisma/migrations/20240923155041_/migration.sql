/*
  Warnings:

  - You are about to drop the `RegularServer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VipServer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `RegularServer`;

-- DropTable
DROP TABLE `VipServer`;

-- CreateTable
CREATE TABLE `Server` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `playercount` VARCHAR(191) NOT NULL,
    `launchDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `feature` VARCHAR(191) NOT NULL,
    `vip` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Server_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
