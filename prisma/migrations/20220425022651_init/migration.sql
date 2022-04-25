-- CreateEnum
CREATE TYPE "emailstatus" AS ENUM ('pending', 'confirmed');

-- CreateEnum
CREATE TYPE "userstatus" AS ENUM ('pending', 'active');

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(40),
    "body" VARCHAR,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "edited_at" TIMESTAMPTZ(6),
    "author" INTEGER,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "passwordhash" VARCHAR NOT NULL,
    "registeredat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "confirmedat" TIMESTAMPTZ(6),
    "emails" "emailstatus" DEFAULT E'pending',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
