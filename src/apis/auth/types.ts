import { z } from "zod";

export const userSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  nickname: z.string(),
  createdAt: z.date().nullable(),
  friendId: z.string(),
});
export type User = z.infer<typeof userSchema>;

export const signupFormSchema = z
  .object({
    email: z.string().email("이메일 형식이 올바르지 않습니다."),
    nickname: z
      .string()
      .min(2, "닉네임은 2자 이상이어야 합니다.")
      .max(10, "닉네임은 10자 이하이어야 합니다.")
      .trim(),
    friendId: z
      .string()
      .min(1, "친구 ID를 입력해주세요.")
      .max(16, "친구 ID는 16자입니다."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(64, "비밀번호는 64자 이하이어야 합니다.")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d).+$/,
        "비밀번호는 영문과 숫자 조합이어야 합니다."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
export type SignupFormRequest = z.infer<typeof signupFormSchema>;

export const signinFormSchema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(64, "비밀번호는 64자 이하이어야 합니다.")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "비밀번호는 영문과 숫자 조합이어야 합니다."
    ),
});
export type SigninFormRequest = z.infer<typeof signinFormSchema>;
