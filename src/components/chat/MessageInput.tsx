"use client";

import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { SendMessageParams } from "@/apis/chat/types";
import { sendMessage } from "@/apis/chat";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/errorMessage";
import { useSendMessage } from "@/apis/chat/queries";

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

  const sendMessageMutation = useSendMessage();

  const onSubmit = async (data: MessageFormData) => {
    if (data.message.trim() === "") {
      toast.error("메시지를 입력해주세요.");
      return;
    }

    sendMessageMutation.mutate(
      {
        chatRoomId,
        senderId: currentUserId,
        senderName: currentUserName,
        text: data.message,
      },
      {
        onSuccess: () => {
          reset();
          toast.success("메시지 전송 완료");
        },
        onError: (error) => {
          console.error("메시지 전송 오류:", error);
          toast.error("메시지 전송에 실패했습니다.");
        },
      }
    );
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute w-10 h-10 p-2 right-4 top-1/2 -translate-y-1/2 hover:bg-gray-200 rounded-md transition-all duration-300 cursor-pointer"
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
