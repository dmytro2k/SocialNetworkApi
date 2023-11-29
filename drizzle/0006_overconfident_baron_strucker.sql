ALTER TABLE "posts" DROP CONSTRAINT "posts_image_id_images_image_id_fk";
--> statement-breakpoint
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_image_id_images_image_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "updated_at" timestamp (0) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "updated_at" timestamp (0) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "updated_at" timestamp (0) DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_image_id_images_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "images"("image_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_image_id_images_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "images"("image_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
