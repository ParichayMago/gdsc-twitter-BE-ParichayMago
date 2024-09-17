/*
  Warnings:

  - You are about to drop the column `replyId` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Tweet` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_replyId_fkey";

-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_userId_fkey";

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "likedByUser" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "replyId",
DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "replyIdTweet" TEXT DEFAULT 'null',
ADD COLUMN     "totalLikes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalReplies" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_replyIdTweet_fkey" FOREIGN KEY ("replyIdTweet") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
