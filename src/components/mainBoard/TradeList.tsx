import Button from "../ui/Button/Button";
import { useGetCardTrades } from "@/apis/board/queries";
import { CardTrade } from "@/apis/board/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface TradeListProps {
  cardTrades: CardTrade[];
}

export default function TradeList({ cardTrades }: TradeListProps) {
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useGetCardTrades();

  const { ref } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const allTrades = cardTrades;

  return (
    <div className="space-y-6">
      {allTrades.map((cardTrade, index) => {
        const isLastElement = allTrades.length === index + 1;

        return (
          <div
            key={cardTrade.id}
            ref={isLastElement ? ref : null}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200"
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
            <p className="text-gray-700 mb-4 leading-relaxed">
              {cardTrade.content}
            </p>

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
            <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
              <Button>거래 제안하기</Button>
            </div>
          </div>
        );
      })}

      {isFetchingNextPage && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      )}
    </div>
  );
}
