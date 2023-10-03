ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
