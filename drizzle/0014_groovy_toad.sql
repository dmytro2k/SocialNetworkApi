/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'profiles'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "profiles" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_user_id" PRIMARY KEY("id","user_id");--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id_unique" UNIQUE("id");