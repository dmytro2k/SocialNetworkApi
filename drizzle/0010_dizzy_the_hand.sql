ALTER TABLE "posts" DROP CONSTRAINT "posts_imageId_images_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_imageId_images_id_fk" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
