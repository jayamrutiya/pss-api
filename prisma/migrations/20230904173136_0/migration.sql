-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `customerMasterId` INTEGER NULL;

-- CreateTable
CREATE TABLE `CustomerMaster` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` TEXT NOT NULL,
    `companyName` TEXT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CustomerMaster` ADD CONSTRAINT `CustomerMaster_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_customerMasterId_fkey` FOREIGN KEY (`customerMasterId`) REFERENCES `CustomerMaster`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;