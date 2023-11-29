import { Socket } from 'socket.io';
import { DefaultEventsMap, EventsMap } from 'socket.io/dist/typed-events';

export interface TypedSocket extends Socket<DefaultEventsMap, CustomEvents> {}

export interface CustomEvents extends EventsMap {
  SendMessageEvent: (payload: SendMessageEventPayload) => void;
  ReceiveMessageEvent: (payload: ReceiveMessageEventPayload) => void;
  AuthEvent: (payload: JoinRoomEventPayload) => void;
  Error: (payload: ErrorEventPayload) => void;
}

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
