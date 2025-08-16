import { z } from "zod";

export const signupFormSchema = z
  .object({
    email: z.string().email("이메일 형식이 올바르지 않습니다."),
    nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
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

export const userSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  nickname: z.string(),
  createdAt: z.date().nullable(),
});
export type User = z.infer<typeof userSchema>;
