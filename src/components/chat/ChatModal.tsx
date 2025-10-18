import { useGetUser } from "@/apis/auth/queries";
import ChatInput from "@/components/chat/MessageInput";
import { useAppSelector } from "@/store/hooks";

interface ChatModalProps {
  chatRoomId: string;
  otherUserName: string;
  onClose: () => void;
}

export default function ChatModal({
  chatRoomId,
  otherUserName,
  onClose,
}: ChatModalProps) {
  const { data: user } = useGetUser();

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div>
      <ChatInput
        chatRoomId={chatRoomId}
        currentUserId={user.uid}
        currentUserName={user.nickname}
      />
    </div>
  );
}
