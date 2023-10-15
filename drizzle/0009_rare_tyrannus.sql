DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('post', 'avatar');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_imageId_images_id_fk";
--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "type" "type" DEFAULT 'post' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_imageId_images_id_fk" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
