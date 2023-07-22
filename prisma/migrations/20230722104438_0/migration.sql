/*
  Warnings:

  - You are about to drop the column `distinctiveNumber` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `shareCertificateNumber` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `totalShareQuantity` on the `customer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Customer_userId_fkey` ON `customer`;

-- DropIndex
DROP INDEX `Template_userId_fkey` ON `template`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `distinctiveNumber`,
    DROP COLUMN `shareCertificateNumber`,
    DROP COLUMN `totalShareQuantity`,
    ADD COLUMN `tableSDT` TEXT NULL,
    ADD COLUMN `totalShares` TEXT NULL;

-- AddForeignKey
ALTER TABLE `Template` ADD CONSTRAINT `Template_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
