ALTER TABLE "comments" ALTER COLUMN "comment_edited" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "likes" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "post_edited" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;