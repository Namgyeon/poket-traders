import z from "zod";

export const messageSchema = z.object({
  id: z.string(),
  text: z.string(),
  senderId: z.string(),
  senderName: z.string(),
  createdAt: z.date(),
  isRead: z.boolean(),
});
export type Message = z.infer<typeof messageSchema>;

export const chatRoomSchema = z.object({
  id: z.string(),
  participants: z.array(z.string()),
  participantInfo: z.array(
    z.object({
      uid: z.string(),
      nickname: z.string(),
      avatar: z.string(),
    })
  ),
  lastMessage: messageSchema.nullable(),
  lastMessageAt: z.date().nullable(),
  createdAt: z.date(),
});
export type ChatRoom = z.infer<typeof chatRoomSchema>;

export const createChatRoomParams = z.object({
  currentUserId: z.string(),
  currentUserNickname: z.string(),
  otherUserId: z.string(),
  otherUserNickname: z.string(),
  currentUserAvatar: z.string(),
  otherUserAvatar: z.string(),
});
export type CreateChatRoomParams = z.infer<typeof createChatRoomParams>;

export const sendMessageParams = z.object({
  chatRoomId: z.string(),
  senderId: z.string(),
  senderName: z.string(),
  senderAvatar: z.string().nullable(),
  text: z.string(),
});
export type SendMessageParams = z.infer<typeof sendMessageParams>;
