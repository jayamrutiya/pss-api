-- DropIndex
DROP INDEX `Customer_userId_fkey` ON `customer`;

-- DropIndex
DROP INDEX `Template_userId_fkey` ON `template`;

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `cdslOrNsdl` VARCHAR(191) NULL,
    ADD COLUMN `dematNumber` VARCHAR(191) NULL,
    ADD COLUMN `dpName` VARCHAR(191) NULL,
    ADD COLUMN `fhaccountNumber` VARCHAR(191) NULL,
    ADD COLUMN `fhaccountTypeSavingorCurrent` VARCHAR(191) NULL,
    ADD COLUMN `fhbankAddress` TEXT NULL,
    ADD COLUMN `fhbankEmail` VARCHAR(191) NULL,
    ADD COLUMN `fhbankIfscCode` VARCHAR(191) NULL,
    ADD COLUMN `fhbankName` VARCHAR(191) NULL,
    ADD COLUMN `fhbankTelephoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `fhholderAddressInBank` VARCHAR(191) NULL,
    ADD COLUMN `fhnameAsPerBankAccount` VARCHAR(191) NULL,
    ADD COLUMN `fhnineDigitMICRNumber` VARCHAR(191) NULL,
    ADD COLUMN `jhaadharcardNumber` VARCHAR(191) NULL,
    ADD COLUMN `jhaccountNumber` VARCHAR(191) NULL,
    ADD COLUMN `jhaccountTypeSavingorCurrent` VARCHAR(191) NULL,
    ADD COLUMN `jhaddressSameInAadharcard` TEXT NULL,
    ADD COLUMN `jhage` VARCHAR(191) NULL,
    ADD COLUMN `jhbankAddress` TEXT NULL,
    ADD COLUMN `jhbankEmail` VARCHAR(191) NULL,
    ADD COLUMN `jhbankIfscCode` VARCHAR(191) NULL,
    ADD COLUMN `jhbankName` VARCHAR(191) NULL,
    ADD COLUMN `jhbankTelephoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `jhcity` VARCHAR(191) NULL,
    ADD COLUMN `jhcontactNumber` VARCHAR(191) NULL,
    ADD COLUMN `jhfatherOrHusbandName` VARCHAR(191) NULL,
    ADD COLUMN `jhgender` VARCHAR(191) NULL,
    ADD COLUMN `jhholderAddressInBank` VARCHAR(191) NULL,
    ADD COLUMN `jhnameAsPerBankAccount` VARCHAR(191) NULL,
    ADD COLUMN `jhnameAsPerShareCertificate` VARCHAR(191) NULL,
    ADD COLUMN `jhnameInAadharcardExactSpeling` VARCHAR(191) NULL,
    ADD COLUMN `jhnameInPancardExactSpelling` VARCHAR(191) NULL,
    ADD COLUMN `jhnineDigitMICRNumber` VARCHAR(191) NULL,
    ADD COLUMN `jholdAddressCompanyRegister` TEXT NULL,
    ADD COLUMN `jhpancardNumber` VARCHAR(191) NULL,
    ADD COLUMN `jhstate` VARCHAR(191) NULL,
    ADD COLUMN `nameAsPerDematAccount` VARCHAR(191) NULL,
    ADD COLUMN `nomineeAddress` TEXT NULL,
    ADD COLUMN `nomineeBirthdate` DATETIME(3) NULL,
    ADD COLUMN `nomineeFatherOrHusbandName` VARCHAR(191) NULL,
    ADD COLUMN `nomineeHolderRelationShip` VARCHAR(191) NULL,
    ADD COLUMN `nomineeName` VARCHAR(191) NULL,
    MODIFY `fholdAddressCompanyRegister` TEXT NULL;

-- AddForeignKey
ALTER TABLE `Template` ADD CONSTRAINT `Template_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
