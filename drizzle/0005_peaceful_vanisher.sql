ALTER TABLE "comments" ALTER COLUMN "created_at" SET DATA TYPE timestamp (0);--> statement-breakpoint
ALTER TABLE "likes" ALTER COLUMN "created_at" SET DATA TYPE timestamp (0);--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "created_at" SET DATA TYPE timestamp (0);--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "created_at" SET DATA TYPE timestamp (0);