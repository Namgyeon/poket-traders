import { useGetComments } from "@/apis/board/queries";
import { CardTrade } from "@/apis/board/types";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CommentList from "./CommentList";

interface TradeCardProps {
  cardTrade: CardTrade;
  isLastElement: boolean;
  ref: (node?: Element | null) => void;
}

export default function TradeCard({
  cardTrade,
  isLastElement,
  ref,
}: TradeCardProps) {
  const [isOpenComments, setIsOpenComments] = useState(false);
  const { data: comments } = useGetComments(cardTrade.id);
  console.log(cardTrade.id);
  console.log(comments);

  const handleOpenComments = () => {
    setIsOpenComments(true);
  };
  const handleCloseComments = () => {
    setIsOpenComments(false);
  };

  return (
    <div
      key={cardTrade.id}
      ref={isLastElement ? ref : null}
      className="flex flex-col gap-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200"
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
        <div className="bg-blue-100 px-3 py-1 rounded-full text-sm font-medium">
          <p>
            <span className="font-bold text-gray-700">친구 ID : </span>
            {cardTrade.friendId}
          </p>
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

      {/* 액션 버튼 */}
      <div className="inline-flex items-center border-t border-gray-100">
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-1"
          onClick={handleOpenComments}
        >
          <ChatBubbleLeftIcon className="w-6 h-6 text-gray-500" />
          <p className="text-sm text-gray-500">
            {comments?.pages[0].comments.length || 0}
          </p>
        </div>
      </div>

      {isOpenComments && (
        <div>
          <CommentList comments={comments?.pages[0].comments || []} />
        </div>
      )}
    </div>
  );
}
