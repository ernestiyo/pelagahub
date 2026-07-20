-- AlterTable
ALTER TABLE "modules" DROP COLUMN "steps",
DROP COLUMN "tips",
DROP COLUMN "usefulLinks",
DROP COLUMN "whyUseful",
ADD COLUMN     "analogy" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "benefits" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "estimatedTime" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "learningObjectives" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "lessons" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "miniChallenge" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "openingStory" JSONB NOT NULL DEFAULT '[]';
