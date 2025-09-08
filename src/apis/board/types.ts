import z from "zod";

export const postCardTradeRequestSchema = z.object({
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
export type PostCardTradeRequest = z.infer<typeof postCardTradeRequestSchema>;
