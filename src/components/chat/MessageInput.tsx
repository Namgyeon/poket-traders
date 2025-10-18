"use client";

import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { SendMessageParams } from "@/apis/chat/types";
import { sendMessage } from "@/apis/chat";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/errorMessage";

interface MessageInputProps {
  chatRoomId: string;
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar?: string;
}

interface MessageFormData {
  message: string;
}

export default function MessageInput({
  chatRoomId,
  currentUserId,
  currentUserName,
  currentUserAvatar,
}: MessageInputProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MessageFormData>();

  const onSubmit = async (data: MessageFormData) => {
    if (data.message.trim() === "") return;

    try {
      const params: SendMessageParams = {
        chatRoomId,
        senderId: currentUserId,
        senderName: currentUserName,
        senderAvatar: currentUserAvatar,
        text: data.message,
      };

      await sendMessage(params);
      reset();
      toast.success("메시지 전송 완료");
    } catch (error) {
      console.error("메시지 전송 오류: ", error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              {...register("message")}
              placeholder="메시지를 입력해주세요."
              error={!!errors.message}
              errorMessage={errors.message?.message as string}
              className="w-full"
            />
            <button type="submit" disabled={isSubmitting}>
              <PaperAirplaneIcon className="w-10 h-10 p-2 absolute right-4 top-1/2 -translate-y-1/2 hover:bg-gray-200 rounded-md transition-all duration-300 cursor-pointer" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
