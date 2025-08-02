/*
  Warnings:

  - You are about to drop the `_PostToTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."_PostToTag" DROP CONSTRAINT "_PostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PostToTag" DROP CONSTRAINT "_PostToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."comments" DROP CONSTRAINT "comments_postID_fkey";

-- AlterTable
ALTER TABLE "public"."comments" ADD COLUMN     "replyID" TEXT;

-- DropTable
DROP TABLE "public"."_PostToTag";

-- CreateTable
CREATE TABLE "public"."TagsOnPosts" (
    "tagID" INTEGER NOT NULL,
    "postID" TEXT NOT NULL,

    CONSTRAINT "TagsOnPosts_pkey" PRIMARY KEY ("tagID","postID")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_title_key" ON "public"."posts"("title");
