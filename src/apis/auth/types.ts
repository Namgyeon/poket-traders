import { email, z } from "zod";

const signupFormSchema = z
  .object({
    email: z.string().email("이메일 형식이 올바르지 않습니다."),
    nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
    password: z.string().min(8, "비밀번호는 영문 조합 8자 이상이어야 합니다."),
    confirmPassword: z
      .string()
      .min(8, "비밀번호는 영문 조합 8자 이상이어야 합니다."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
export type SignupFormRequest = z.infer<typeof signupFormSchema>;

const userSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  nickname: z.string(),
  createdAt: z.date().nullable(),
});
export type User = z.infer<typeof userSchema>;
