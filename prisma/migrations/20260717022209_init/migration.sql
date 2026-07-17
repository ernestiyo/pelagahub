-- CreateTable
CREATE TABLE "modules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "coverImage" TEXT,
    "whatIsIt" TEXT NOT NULL DEFAULT '',
    "whyUseful" TEXT NOT NULL DEFAULT '',
    "steps" JSONB NOT NULL DEFAULT [],
    "tips" JSONB NOT NULL DEFAULT [],
    "commonMistakes" JSONB NOT NULL DEFAULT [],
    "usefulLinks" JSONB NOT NULL DEFAULT [],
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "modules_slug_key" ON "modules"("slug");
