import z from "zod";

export const postCardTradeRequestSchema = z.object({
  title: z.string(),
  friendId: z.string(),
  content: z.string(),
  offerCards: z.array(z.string()),
  wantCards: z.array(z.string()),
});
export type PostCardTradeRequest = z.infer<typeof postCardTradeRequestSchema>;
