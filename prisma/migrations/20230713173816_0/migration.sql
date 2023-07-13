-- DropIndex
DROP INDEX `WordContent_userId_fkey` ON `wordcontent`;

-- AlterTable
ALTER TABLE `refreshtoken` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `wordcontent` MODIFY `updatedAt` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `WordContent` ADD CONSTRAINT `WordContent_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
