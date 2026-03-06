-- Add classesParticipating with default empty array and remove teachersParticipating
ALTER TABLE "Registration"
DROP COLUMN "teachersParticipating",
ADD COLUMN "classesParticipating" JSONB NOT NULL DEFAULT '[]';
