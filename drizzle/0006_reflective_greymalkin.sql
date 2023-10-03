ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_postId_posts_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
