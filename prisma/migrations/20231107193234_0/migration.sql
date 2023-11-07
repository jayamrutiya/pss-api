-- AlterTable
ALTER TABLE `Customer`
ADD COLUMN `fhbankBranch` VARCHAR(50) NULL,
ADD COLUMN `jhbankBranch` VARCHAR(50) NULL,
ADD COLUMN `jhpinCode` VARCHAR(10) NULL;