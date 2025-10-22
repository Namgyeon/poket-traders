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
  tradeCardId: z.string(),
  tradeCardTitle: z.string(),
  participants: z.array(z.string()),
  participantInfo: z.record(
    z.string(),
    z.object({
      name: z.string(),
      avatar: z.string().optional().nullable(),
    })
  ),
  lastMessage: messageSchema.optional().nullable(),
  lastMessageAt: z.date().optional().nullable(),
  createdAt: z.date(),
});
export type ChatRoom = z.infer<typeof chatRoomSchema>;

export const createChatRoomParams = z.object({
  tradeCardId: z.string(),
  tradeCardTitle: z.string(),
  currentUserId: z.string(),
  currentUserNickname: z.string(),
  otherUserId: z.string(),
  otherUserNickname: z.string(),
  currentUserAvatar: z.string().optional().nullable(),
  otherUserAvatar: z.string().optional().nullable(),
});
export type CreateChatRoomParams = z.infer<typeof createChatRoomParams>;

export const sendMessageParams = z.object({
  chatRoomId: z.string(),
  senderId: z.string(),
  senderName: z.string(),
  senderAvatar: z.string().optional().nullable(),
  text: z.string(),
});
export type SendMessageParams = z.infer<typeof sendMessageParams>;
