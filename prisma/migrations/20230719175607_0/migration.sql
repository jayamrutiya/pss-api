-- DropIndex
DROP INDEX `Customer_userId_fkey` ON `customer`;

-- DropIndex
DROP INDEX `Template_userId_fkey` ON `template`;

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `fhaadharCardNumber` VARCHAR(191) NULL,
    ADD COLUMN `fhaddressSameInAadharcard` TEXT NULL,
    ADD COLUMN `fhage` VARCHAR(191) NULL,
    ADD COLUMN `fhbusiness` VARCHAR(191) NULL,
    ADD COLUMN `fhcity` VARCHAR(191) NULL,
    ADD COLUMN `fhcontactNumber` VARCHAR(191) NULL,
    ADD COLUMN `fhemail` VARCHAR(191) NULL,
    ADD COLUMN `fhfatherOrHusbandName` VARCHAR(191) NULL,
    ADD COLUMN `fhgender` VARCHAR(191) NULL,
    ADD COLUMN `fhnameAsPerShareCertificate` VARCHAR(191) NULL,
    ADD COLUMN `fhnameInAadharcardExactSpeling` VARCHAR(191) NULL,
    ADD COLUMN `fhnameInPancardExactSpelling` VARCHAR(191) NULL,
    ADD COLUMN `fholdAddressCompanyRegister` VARCHAR(191) NULL,
    ADD COLUMN `fhpancardNumber` VARCHAR(191) NULL,
    ADD COLUMN `fhpinCode` VARCHAR(191) NULL,
    ADD COLUMN `fhrateInPercentage` VARCHAR(191) NULL,
    ADD COLUMN `fhstate` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Template` ADD CONSTRAINT `Template_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
