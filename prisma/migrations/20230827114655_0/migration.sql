/*
  Warnings:

  - You are about to alter the column `emailId` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `fhnameInPancardExactSpelling` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `fhpinCode` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.
  - You are about to alter the column `fhgender` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.
  - You are about to alter the column `fhage` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.
  - You are about to alter the column `jhgender` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.
  - You are about to alter the column `jhstate` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.
  - You are about to alter the column `jhage` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.
  - You are about to alter the column `s1age` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.
  - You are about to alter the column `gender` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.
  - You are about to alter the column `age` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.

*/
-- DropIndex
DROP INDEX `Customer_userId_fkey` ON `customer`;

-- DropIndex
DROP INDEX `CustomerTemplate_customerId_fkey` ON `customertemplate`;

-- DropIndex
DROP INDEX `CustomerTemplate_templateId_fkey` ON `customertemplate`;

-- DropIndex
DROP INDEX `Template_userId_fkey` ON `template`;

-- AlterTable
ALTER TABLE `customer` MODIFY `companyName` VARCHAR(50) NULL,
    MODIFY `emailId` VARCHAR(50) NOT NULL,
    MODIFY `registerTransferAgentName` VARCHAR(50) NULL,
    MODIFY `registerTransferAgentEmail` VARCHAR(50) NULL,
    MODIFY `oldCompanyName` VARCHAR(50) NULL,
    MODIFY `fhnameInPancardExactSpelling` VARCHAR(50) NULL,
    MODIFY `fhnameAsPerShareCertificate` VARCHAR(50) NULL,
    MODIFY `fhfatherOrHusbandName` VARCHAR(50) NULL,
    MODIFY `fhemail` VARCHAR(50) NULL,
    MODIFY `fhpinCode` VARCHAR(10) NULL,
    MODIFY `fhgender` VARCHAR(10) NULL,
    MODIFY `fhage` VARCHAR(10) NULL,
    MODIFY `fhnameInAadharcardExactSpeling` VARCHAR(50) NULL,
    MODIFY `jhnameAsPerShareCertificate` VARCHAR(50) NULL,
    MODIFY `jhfatherOrHusbandName` VARCHAR(50) NULL,
    MODIFY `jhgender` VARCHAR(10) NULL,
    MODIFY `jhstate` VARCHAR(10) NULL,
    MODIFY `jhage` VARCHAR(10) NULL,
    MODIFY `jhnameInAadharcardExactSpeling` VARCHAR(50) NULL,
    MODIFY `fhaccountTypeSavingorCurrent` VARCHAR(30) NULL,
    MODIFY `fhbankEmail` VARCHAR(50) NULL,
    MODIFY `fhnameAsPerBankAccount` VARCHAR(50) NULL,
    MODIFY `jhbankName` VARCHAR(30) NULL,
    MODIFY `jhemail` VARCHAR(50) NULL,
    MODIFY `jhbankEmail` VARCHAR(50) NULL,
    MODIFY `jhnameAsPerBankAccount` VARCHAR(50) NULL,
    MODIFY `dpName` VARCHAR(50) NULL,
    MODIFY `nameAsPerDematAccount` VARCHAR(50) NULL,
    MODIFY `nomineeName` VARCHAR(50) NULL,
    MODIFY `nomineeFatherOrHusbandName` VARCHAR(50) NULL,
    MODIFY `w1NameInPancardExactSpelling` VARCHAR(50) NULL,
    MODIFY `w1nameInAadharcardExactSpelling` VARCHAR(50) NULL,
    MODIFY `w2nameInPancardExactSpelling` VARCHAR(50) NULL,
    MODIFY `w2nameInAadharcardExactSpelling` VARCHAR(50) NULL,
    MODIFY `s1nameInPancardExactSpelling` VARCHAR(50) NULL,
    MODIFY `s1nameInAadharcard` VARCHAR(50) NULL,
    MODIFY `s1age` VARCHAR(10) NULL,
    MODIFY `s1email` VARCHAR(50) NULL,
    MODIFY `s2nameInPancardExactSpelling` VARCHAR(50) NULL,
    MODIFY `s2nameInAadharcard` VARCHAR(50) NULL,
    MODIFY `s2email` VARCHAR(50) NULL,
    MODIFY `policeStationName` VARCHAR(50) NULL,
    MODIFY `oldName` VARCHAR(50) NULL,
    MODIFY `newname` VARCHAR(50) NULL,
    MODIFY `deathHolderName1` VARCHAR(50) NULL,
    MODIFY `deathHolderName2` VARCHAR(50) NULL,
    MODIFY `certificateDeathHolderName1` VARCHAR(50) NULL,
    MODIFY `certificateDeathHolderName2` VARCHAR(50) NULL,
    MODIFY `legalNamePancard` VARCHAR(50) NULL,
    MODIFY `successionCertificateCourtOrderDateAndYear` VARCHAR(50) NULL,
    MODIFY `nameInPancardExectSpelling` VARCHAR(50) NULL,
    MODIFY `nameAsPerShareCertificate` VARCHAR(50) NULL,
    MODIFY `fatherOrHusbandName` VARCHAR(50) NULL,
    MODIFY `email` VARCHAR(50) NULL,
    MODIFY `gender` VARCHAR(10) NULL,
    MODIFY `age` VARCHAR(10) NULL,
    MODIFY `lhanameAsPerBankAccount` VARCHAR(50) NULL,
    MODIFY `lhadpName` VARCHAR(50) NULL,
    MODIFY `iepfDividendAmount` VARCHAR(50) NULL,
    MODIFY `iepfDividendYear` VARCHAR(50) NULL,
    MODIFY `referenceLetterNo` VARCHAR(50) NULL;

-- AddForeignKey
ALTER TABLE `Template` ADD CONSTRAINT `Template_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTemplate` ADD CONSTRAINT `CustomerTemplate_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTemplate` ADD CONSTRAINT `CustomerTemplate_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
