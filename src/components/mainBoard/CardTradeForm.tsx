import {
  PostCardTradeForm,
  postCardTradeFormSchema,
} from "@/apis/trades/types";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { usePostCardTrade } from "@/apis/trades/queries";
import Textarea from "../ui/Input/TextArea";
import TagInput from "../ui/Input/TagInput";
import { User } from "@/apis/auth/types";
import { toast } from "sonner";

interface CardTradeFormProps {
  user?: User | null;
  onClose: () => void;
}

export default function CardTradeForm({ user, onClose }: CardTradeFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PostCardTradeForm>({
    resolver: zodResolver(postCardTradeFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      friendId: user?.friendId || "",
      offerCards: [],
      wantCards: [],
    },
  });

  const watchedValues = watch();

  const { mutateAsync: postCardTrade } = usePostCardTrade();

  const onSubmit = async (data: PostCardTradeForm) => {
    try {
      const submitData = {
        ...data,
        authorName: user?.nickname || "",
        uid: user?.uid || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await postCardTrade(submitData);
      toast.success("게시글 등록 완료");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("게시글 등록 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        {...register("title")}
        value={watchedValues.title}
        error={!!errors.title}
        errorMessage={errors.title?.message}
        label="제목"
        name="title"
      />
      <Textarea
        {...register("content")}
        value={watchedValues.content}
        error={!!errors.content}
        errorMessage={errors.content?.message}
        label="내용"
        name="content"
      />
      <Input
        {...register("friendId")}
        value={watchedValues.friendId}
        error={!!errors.friendId}
        errorMessage={errors.friendId?.message}
        label="친구 ID"
        name="friendId"
        placeholder="1234-1234-1234-1234"
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
            maxTags={10}
            placeholder="카드 이름을 입력하고 엔터를 누르세요."
          />
        )}
      />
      <Controller
        name="wantCards"
        control={control}
        render={({ field }) => (
          <TagInput
            tags={field.value || []}
            onTagsChange={field.onChange}
            error={!!errors.wantCards}
            errorMessage={errors.wantCards?.message}
            label="원하는 카드"
            name="wantCards"
            maxTags={10}
            placeholder="카드 이름을 입력하고 엔터를 누르세요."
          />
        )}
      />
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            onClose();
          }}
        >
          취소
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={
            !watchedValues.title ||
            !watchedValues.content ||
            !watchedValues.friendId ||
            !watchedValues.offerCards.length ||
            !watchedValues.wantCards.length
          }
        >
          제출
        </Button>
      </div>
    </form>
  );
}
