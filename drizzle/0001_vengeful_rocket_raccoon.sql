CREATE TABLE IF NOT EXISTS "followers" (
	"user_id" uuid NOT NULL,
	"follower_user_id" uuid NOT NULL,
	CONSTRAINT followers_user_id_follower_user_id PRIMARY KEY("user_id","follower_user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "followers" ADD CONSTRAINT "followers_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "followers" ADD CONSTRAINT "followers_follower_user_id_users_user_id_fk" FOREIGN KEY ("follower_user_id") REFERENCES "users"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
