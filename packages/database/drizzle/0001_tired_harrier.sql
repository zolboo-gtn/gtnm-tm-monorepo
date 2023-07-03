ALTER TABLE "attendances" ADD COLUMN "start" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "attendances" ADD COLUMN "end" timestamp;