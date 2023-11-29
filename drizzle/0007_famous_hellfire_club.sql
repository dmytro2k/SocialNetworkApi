CREATE TABLE IF NOT EXISTS "chat-rooms" (
	"chat_room_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_user_id" uuid NOT NULL,
	"second_user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"message_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message_content" text NOT NULL,
	"user_id" uuid NOT NULL,
	"chat_room_id" uuid NOT NULL,
	"message_edited" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp (0) DEFAULT now() NOT NULL,
	"created_at" timestamp (0) DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat-rooms" ADD CONSTRAINT "chat-rooms_first_user_id_users_user_id_fk" FOREIGN KEY ("first_user_id") REFERENCES "users"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat-rooms" ADD CONSTRAINT "chat-rooms_second_user_id_users_user_id_fk" FOREIGN KEY ("second_user_id") REFERENCES "users"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_room_id_chat-rooms_chat_room_id_fk" FOREIGN KEY ("chat_room_id") REFERENCES "chat-rooms"("chat_room_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
