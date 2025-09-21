"use client";

import {
  UserInfoUpdateFormRequest,
  userInfoUpdateFormSchema,
} from "@/apis/user/types";
import Input from "@/components/ui/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button/Button";
import { useUpdateUserInfo } from "@/apis/user/queries";
import { toast } from "sonner";
import { useGetUser } from "@/apis/auth/queries";
import { useEffect } from "react";

export default function UserInfoUpdateForm() {
  const { mutateAsync: updateUserInfo } = useUpdateUserInfo();
  const { data: user } = useGetUser();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<UserInfoUpdateFormRequest>({
    resolver: zodResolver(userInfoUpdateFormSchema),
    mode: "onChange",
  });

  const watchedValues = watch();

  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname,
        friendId: user.friendId,
      });
    }
  }, [user]);

  const onSubmit = async (data: UserInfoUpdateFormRequest) => {
    try {
      await updateUserInfo(data);
      toast.success("사용자 정보가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("사용자 정보 업데이트 실패");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 md:gap-6"
    >
      <Input
        label="닉네임"
        {...register("nickname")}
        hasValue={!!watchedValues.nickname}
        error={!!errors.nickname}
        errorMessage={errors.nickname?.message}
      />
      <Input
        label="친구 ID"
        {...register("friendId")}
        hasValue={!!watchedValues.friendId}
        error={!!errors.friendId}
        errorMessage={errors.friendId?.message}
      />
      <Button
        type="submit"
        variant="primary"
        disabled={!isValid || isSubmitting}
      >
        정보 수정
      </Button>
    </form>
  );
}
