import z from "zod";

export const userInfoUpdateFormSchema = z.object({
  nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
  friendId: z
    .string()
    .min(16, "친구 ID는 16자입니다.")
    .max(16, "친구 ID는 16자입니다."),
});
export type UserInfoUpdateFormRequest = z.infer<
  typeof userInfoUpdateFormSchema
>;
