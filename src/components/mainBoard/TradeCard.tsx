import { useGetComments } from "@/apis/trades/queries";
import { CardTrade } from "@/apis/trades/types";
import { ChatBubbleLeftIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CommentList from "@/components/mainBoard/CommentList";
import CommentForm from "@/components/mainBoard/CommentForm";
import FriendId from "@/components/ui/FriendId";
import { useGetUser } from "@/apis/auth/queries";
import clsx from "clsx";
import Button from "@/components/ui/Button/Button";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/ui/Modal/Modal";
import ChatModal from "@/components/chat/ChatModal";
import { toast } from "sonner";
import { getOrCreateChatRoom } from "@/apis/chat";

interface TradeCardProps {
  cardTrade: CardTrade;
  isLastElement: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  ref: (node?: Element | null) => void;
}

export default function TradeCard({
  cardTrade,
  isLastElement,
  ref,
}: TradeCardProps) {
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  const { data: comments } = useGetComments(cardTrade.id);
  const { data: user } = useGetUser();

  const { openModal, closeModal, isOpen } = useModal();

  const handleToggleComments = () => {
    setIsOpenComments((prev) => !prev);
  };

  const handleCloseComments = () => {
    setIsOpenComments(false);
  };

  const handleOpenChat = async () => {
    if (!user) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    if (user?.uid === cardTrade.uid) {
      toast.error("자신과의 채팅은 불가능합니다.");
      return;
    }

    setIsCreatingChat(true);

    try {
      // 채팅방 생성 또는 가져오기
      const roomId = await getOrCreateChatRoom({
        currentUserId: user.uid,
        currentUserNickname: user.nickname,
        otherUserId: cardTrade.uid,
        otherUserNickname: cardTrade.authorName,
        currentUserAvatar: user.nickname || "",
      });

      setChatRoomId(roomId);
      openModal();
    } catch (error) {
      console.error("채팅방 생성 실패:", error);
      toast.error("채팅방을 열 수 없습니다.");
    } finally {
      setIsCreatingChat(false);
    }
  };

  return (
    <div
      key={cardTrade.id}
      ref={isLastElement ? ref : null}
      className={clsx(
        "flex flex-col gap-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200",
        user?.uid === cardTrade.uid ? "bg-gray-100" : "bg-white"
      )}
    >
      {/* 헤더 */}
      <div className="flex flex-col md:flex-row gap-2 items-start justify-between mb-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {cardTrade.title}
          </h3>
          <p className="text-sm text-gray-500">
            by {cardTrade.authorName} •{" "}
            {new Date(
              cardTrade.createdAt?.toDate?.() || cardTrade.createdAt
            ).toLocaleDateString("ko-KR")}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <FriendId friendId={cardTrade.friendId} />
          <Button
            onClick={handleOpenChat}
            variant="primary"
            // disabled={user?.uid === cardTrade.uid}
          >
            채팅하기
          </Button>
        </div>
      </div>

      {/* 내용 */}
      <p className="text-gray-700 mb-4 leading-relaxed">{cardTrade.content}</p>

      {/* 카드 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 교환할 카드 */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            교환할 카드
          </h4>
          <div className="flex flex-wrap gap-2">
            {cardTrade.offerCards.map((card, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {card}
              </span>
            ))}
          </div>
        </div>

        {/* 원하는 카드 */}
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <h4 className="text-sm font-semibold text-orange-800 mb-2 flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            원하는 카드
          </h4>
          <div className="flex flex-wrap gap-2">
            {cardTrade.wantCards.map((card, index) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {card}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 댓글 버튼 */}
      <div className="inline-flex items-center border-t border-gray-100">
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-1"
          onClick={handleToggleComments}
        >
          <ChatBubbleLeftIcon className="w-6 h-6 text-gray-500" />
          <p className="text-sm text-gray-500">
            {comments?.pages[0].comments.length || 0}
          </p>
        </div>
      </div>

      {isOpenComments && (
        <div className="flex flex-col gap-2">
          <CommentList tradeId={cardTrade.id} />
          <CommentForm tradeId={cardTrade.id} />
          <div className="flex mt-4 items-center justify-center">
            <div
              className="flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-md p-1 transition-all duration-200"
              onClick={handleCloseComments}
            >
              <ChevronUpIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        header={`${cardTrade.authorName}님과의 채팅`}
      >
        {chatRoomId && (
          <ChatModal
            chatRoomId={chatRoomId}
            otherUserName={cardTrade.authorName}
            onClose={closeModal}
          />
        )}
      </Modal>
    </div>
  );
}
