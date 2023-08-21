-- DropIndex
DROP INDEX `Customer_userId_fkey` ON `customer`;

-- DropIndex
DROP INDEX `CustomerTemplate_customerId_fkey` ON `customertemplate`;

-- DropIndex
DROP INDEX `CustomerTemplate_templateId_fkey` ON `customertemplate`;

-- DropIndex
DROP INDEX `Template_userId_fkey` ON `template`;

-- AlterTable
ALTER TABLE `customer` MODIFY `emailId` VARCHAR(100) NOT NULL,
    MODIFY `fhnameInPancardExactSpelling` VARCHAR(100) NULL,
    MODIFY `jhnameInPancardExactSpelling` VARCHAR(100) NULL,
    MODIFY `fhholderAddressInBank` TEXT NULL,
    MODIFY `jhholderAddressInBank` TEXT NULL,
    MODIFY `nameInAdharcardExactSpeling` VARCHAR(100) NULL;

-- AddForeignKey
ALTER TABLE `Template` ADD CONSTRAINT `Template_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTemplate` ADD CONSTRAINT `CustomerTemplate_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTemplate` ADD CONSTRAINT `CustomerTemplate_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
