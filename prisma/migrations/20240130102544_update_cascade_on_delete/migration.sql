-- DropForeignKey
ALTER TABLE `schedules` DROP FOREIGN KEY `schedules_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
