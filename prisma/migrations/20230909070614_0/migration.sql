-- -- DropIndex
-- DROP INDEX `Customer_customerMasterId_fkey` ON `customer`;

-- -- DropIndex
-- DROP INDEX `Customer_userId_fkey` ON `customer`;

-- -- DropIndex
-- DROP INDEX `CustomerMaster_userId_fkey` ON `customermaster`;

-- -- DropIndex
-- DROP INDEX `CustomerTemplate_customerId_fkey` ON `customertemplate`;

-- -- DropIndex
-- DROP INDEX `CustomerTemplate_templateId_fkey` ON `customertemplate`;

-- -- DropIndex
-- DROP INDEX `Template_userId_fkey` ON `template`;

-- AlterTable
ALTER TABLE `CustomerTemplate` ADD COLUMN `customerTemplateMasterId` INTEGER NULL;

-- CreateTable
CREATE TABLE `CustomerTemplateMaster` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `customerId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `originalName` VARCHAR(191) NULL,
    `storeDocName` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- AddForeignKey
-- ALTER TABLE `Template` ADD CONSTRAINT `Template_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerMaster` ADD CONSTRAINT `CustomerMaster_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Customer` ADD CONSTRAINT `Customer_customerMasterId_fkey` FOREIGN KEY (`customerMasterId`) REFERENCES `CustomerMaster`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Customer` ADD CONSTRAINT `Customer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTemplateMaster` ADD CONSTRAINT `CustomerTemplateMaster_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTemplateMaster` ADD CONSTRAINT `CustomerTemplateMaster_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTemplate` ADD CONSTRAINT `CustomerTemplate_customerTemplateMasterId_fkey` FOREIGN KEY (`customerTemplateMasterId`) REFERENCES `CustomerTemplateMaster`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `CustomerTemplate` ADD CONSTRAINT `CustomerTemplate_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `CustomerTemplate` ADD CONSTRAINT `CustomerTemplate_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
