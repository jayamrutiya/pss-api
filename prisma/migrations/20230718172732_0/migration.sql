-- DropIndex
DROP INDEX `Template_userId_fkey` ON `template`;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `date` TIMESTAMP(6) NULL,
    `companyName` VARCHAR(191) NULL,
    `companyAddress` TEXT NULL,
    `companyNumber` VARCHAR(191) NULL,
    `emailId` VARCHAR(191) NOT NULL,
    `registerTransferAgentName` VARCHAR(191) NULL,
    `registerTransferAgentAdress` TEXT NULL,
    `registerTransferAgentContactNumber` VARCHAR(191) NULL,
    `registerTransferAgentEmail` VARCHAR(191) NULL,
    `ledgerFolio` VARCHAR(191) NULL,
    `shareCertificateNumber` VARCHAR(191) NULL,
    `distinctiveNumber` VARCHAR(191) NULL,
    `totalShareQuantity` VARCHAR(191) NULL,
    `faceValueAsOnToday` VARCHAR(191) NULL,
    `holdShareQuantitySelf` VARCHAR(191) NULL,
    `companyHoldUndeliveredShareQuantity` VARCHAR(191) NULL,
    `holdShareQuantitySelfFaceValue` VARCHAR(191) NULL,
    `oldCompanyName` VARCHAR(191) NULL,
    `oldQuantityholdShare` VARCHAR(191) NULL,
    `ywdATabelData` TEXT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Template` ADD CONSTRAINT `Template_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
