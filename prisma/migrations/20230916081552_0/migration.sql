-- AlterTable
ALTER TABLE `customer` ADD COLUMN `deceasedHolderAsPerMunicipalityCertificate` VARCHAR(50) NULL,
    ADD COLUMN `deceasedHolderAsPerShareCertificate` VARCHAR(50) NULL,
    ADD COLUMN `fhRelationship` VARCHAR(50) NULL,
    ADD COLUMN `jhRelationship` VARCHAR(50) NULL;
