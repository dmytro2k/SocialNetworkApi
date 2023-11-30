export interface JoinRoomEventPayload {
  chatRoomId: string;
  token: string;
}

export interface ErrorEventPayload {
  msg: string;
}

export interface SendMessageEventPayload {
  messageContent: string;
  userId: string;
  chatRoomId: string;
}

export interface ReceiveMessageEventPayload {
  chatRoomId: string;
  userId: string;
  messageContent: string;
  messageId: string;
  messageEdited: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface UpdateMessageEventPayload {
  messageContent: string;
  userId: string;
  messageId: string;
  chatRoomId: string;
}
