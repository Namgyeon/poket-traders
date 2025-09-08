import {
  PostCardTradeRequest,
  postCardTradeRequestSchema,
} from "@/apis/board/types";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { usePostCardTrade } from "@/apis/board/queries";
import Textarea from "../ui/Input/TextArea";
import TagInput from "../ui/Input/TagInput";

export default function CardTradeForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostCardTradeRequest>({
    resolver: zodResolver(postCardTradeRequestSchema),
    mode: "onChange",
  });

  const { mutateAsync: postCardTrade } = usePostCardTrade();

  const onSubmit = async (data: PostCardTradeRequest) => {
    try {
      await postCardTrade(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        {...register("title")}
        error={!!errors.title}
        errorMessage={errors.title?.message}
        label="제목"
        name="title"
      />
      <Textarea
        {...register("content")}
        error={!!errors.content}
        errorMessage={errors.content?.message}
        label="내용"
        name="content"
      />
      <Controller
        name="offerCards"
        control={control}
        render={({ field }) => (
          <TagInput
            tags={field.value || []}
            onTagsChange={field.onChange}
            error={!!errors.offerCards}
            errorMessage={errors.offerCards?.message}
            label="교환할 카드"
            name="offerCards"
          />
        )}
      />
      <TagInput
        {...register("wantCards")}
        error={!!errors.wantCards}
        errorMessage={errors.wantCards?.message}
        label="원하는 카드"
        name="wantCards"
      />
      <Button type="submit" variant="primary">
        제출
      </Button>
    </form>
  );
}
