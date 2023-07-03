DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('approved', 'cancelled', 'declined', 'pending');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('dayoff', 'holiday', 'office', 'remote', 'sick');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attendances" (
	"id" serial PRIMARY KEY NOT NULL,
	"comment" text,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"type" "type" NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"evaluated_at" timestamp,
	"evaluated_by" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "remote_sheets" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"role" "role" NOT NULL,
	"hash" text NOT NULL,
	"cardId" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendances" ADD CONSTRAINT "attendances_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendances" ADD CONSTRAINT "attendances_evaluated_by_users_id_fk" FOREIGN KEY ("evaluated_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "remote_sheets" ADD CONSTRAINT "remote_sheets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
