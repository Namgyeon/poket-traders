import { Timestamp } from "firebase/firestore";
import z from "zod";

export const postCardTradeFormSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  friendId: z.string().min(1, { message: "친구 ID를 입력해주세요." }),
  content: z.string().min(1, { message: "내용을 입력해주세요." }),
  offerCards: z
    .array(z.string())
    .min(1, { message: "교환할 카드를 선택해주세요." }),
  wantCards: z
    .array(z.string())
    .min(1, { message: "원하는 카드를 선택해주세요." }),
});
export type PostCardTradeForm = z.infer<typeof postCardTradeFormSchema>;

export const postCardTradeRequestSchema = postCardTradeFormSchema.extend({
  authorName: z.string(),
  uid: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type PostCardTradeRequest = z.infer<typeof postCardTradeRequestSchema>;

export const cardTradeSchema = z.object({
  id: z.string(),
  authorName: z.string(),
  uid: z.string(),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
  title: z.string(),
  friendId: z.string(),
  content: z.string(),
  offerCards: z.array(z.string()),
  wantCards: z.array(z.string()),
});
export type CardTrade = z.infer<typeof cardTradeSchema>;

export const postCommentRequestSchema = z.object({
  content: z.string(),
  friendId: z.string(),
  authorId: z.string(),
  authorName: z.string(),
});
export type PostCommentRequest = z.infer<typeof postCommentRequestSchema>;

export const commentSchema = z.object({
  id: z.string(),
  content: z.string(),
  authorId: z.string(),
  authorName: z.string(),
  createdAt: z.instanceof(Timestamp),
  friendId: z.string(),
});
export type Comment = z.infer<typeof commentSchema>;
