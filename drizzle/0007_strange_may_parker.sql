CREATE TABLE IF NOT EXISTS "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" uuid NOT NULL,
	"extension" text NOT NULL,
	CONSTRAINT "images_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "imageId" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_imageId_images_id_fk" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
