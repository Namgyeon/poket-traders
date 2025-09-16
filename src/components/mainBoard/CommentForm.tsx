"use client";
import { useForm } from "react-hook-form";
import Textarea from "../ui/Input/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  postCommentRequestSchema,
  PostCommentRequest,
} from "@/apis/board/types";
import { useGetUser } from "@/apis/auth/queries";
import Button from "@/components/ui/Button/Button";
import { usePostComment } from "@/apis/board/queries";

interface CommentFormProps {
  tradeId: string;
}

export default function CommentForm({ tradeId }: CommentFormProps) {
  const { data: user } = useGetUser();
  const { mutateAsync: postComment } = usePostComment();
  console.log("유저정보:", user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostCommentRequest>({
    resolver: zodResolver(postCommentRequestSchema),
    defaultValues: {
      content: "",
      friendId: user?.friendId,
      authorId: "",
      authorName: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    try {
      await postComment({
        tradeId,
        commentData: {
          ...data,
          authorId: user?.uid,
          authorName: user?.nickname || user?.email,
        },
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" {...register("friendId")} />
      <Textarea
        {...register("content")}
        rows={2}
        error={!!errors.content}
        errorMessage={errors.content?.message}
        placeholder="댓글을 입력해주세요."
      />
      <Button type="submit" variant="primary">
        댓글 작성
      </Button>
    </form>
  );
}
