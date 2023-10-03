CREATE TABLE IF NOT EXISTS "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"userId" uuid NOT NULL,
	"postId" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
