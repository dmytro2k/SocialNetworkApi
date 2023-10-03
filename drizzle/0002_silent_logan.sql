CREATE TABLE IF NOT EXISTS "likes" (
	"userId" uuid NOT NULL,
	"postId" uuid NOT NULL,
	CONSTRAINT likes_userId_postId PRIMARY KEY("userId","postId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
