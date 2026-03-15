-- Add institution type and participation options, migrate existing class selections
DO $$ BEGIN
  CREATE TYPE "InstitutionType" AS ENUM ('SCHOOL', 'COLLEGE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "Registration"
ADD COLUMN "institutionType" "InstitutionType" NOT NULL DEFAULT 'SCHOOL',
ADD COLUMN "participationOptions" JSONB NOT NULL DEFAULT '[]';

UPDATE "Registration"
SET "participationOptions" = COALESCE("classesParticipating", '[]'::jsonb);

ALTER TABLE "Registration"
DROP COLUMN "classesParticipating";
