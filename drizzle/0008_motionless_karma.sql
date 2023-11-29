ALTER TABLE "chat-rooms" RENAME TO "chat_rooms";--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT "messages_chat_room_id_chat-rooms_chat_room_id_fk";
--> statement-breakpoint
ALTER TABLE "chat_rooms" DROP CONSTRAINT "chat-rooms_first_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "chat_rooms" DROP CONSTRAINT "chat-rooms_second_user_id_users_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_room_id_chat_rooms_chat_room_id_fk" FOREIGN KEY ("chat_room_id") REFERENCES "chat_rooms"("chat_room_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_rooms" ADD CONSTRAINT "chat_rooms_first_user_id_users_user_id_fk" FOREIGN KEY ("first_user_id") REFERENCES "users"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_rooms" ADD CONSTRAINT "chat_rooms_second_user_id_users_user_id_fk" FOREIGN KEY ("second_user_id") REFERENCES "users"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
