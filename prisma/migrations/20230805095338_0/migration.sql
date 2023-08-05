/*
  Warnings:

  - You are about to alter the column `deathOfHolderFirstHolder` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Date`.
  - You are about to alter the column `deathOfHolderSecondHolder` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Date`.

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
ALTER TABLE `customer` MODIFY `date` DATE NULL,
    MODIFY `nomineeBirthdate` DATE NULL,
    MODIFY `deathOfHolderFirstHolder` DATE NULL,
    MODIFY `deathOfHolderSecondHolder` DATE NULL;

-- AddForeignKey
ALTER TABLE `Template` ADD CONSTRAINT `Template_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTemplate` ADD CONSTRAINT `CustomerTemplate_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTemplate` ADD CONSTRAINT `CustomerTemplate_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
