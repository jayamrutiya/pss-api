-- CreateTable
CREATE TABLE `Document` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerMasterId` INTEGER NOT NULL,
    `name` VARCHAR(191) NULL,
    `originalName` VARCHAR(191) NULL,
    `storeDocName` VARCHAR(191) NULL,
    `mimeType` VARCHAR(191) NULL,
    `sizeInBytes` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_customerMasterId_fkey` FOREIGN KEY (`customerMasterId`) REFERENCES `CustomerMaster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;