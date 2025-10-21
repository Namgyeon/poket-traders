import { useGetUser } from "@/apis/auth/queries";
import ChatInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";

interface ChatModalProps {
  chatRoomId: string;
}

export default function ChatModal({ chatRoomId }: ChatModalProps) {
  const { data: user } = useGetUser();

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <MessageList chatRoomId={chatRoomId} currentUserId={user.uid} />
      <ChatInput
        chatRoomId={chatRoomId}
        currentUserId={user.uid}
        currentUserName={user.nickname}
      />
    </div>
  );
}
