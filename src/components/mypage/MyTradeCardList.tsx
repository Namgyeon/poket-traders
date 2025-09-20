"use client";

import { useGetUser } from "@/apis/auth/queries";
import { useGetCardTrades } from "@/apis/trades/queries";
import TradeCard from "@/components/mainBoard/TradeCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function MyTradeCardList() {
  const { data: user } = useGetUser();
  const {
    data: trades,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCardTrades();

  const { ref } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const myTrades = trades?.pages
    .flatMap((page) => page.trades)
    .filter((trade) => trade.uid === user?.uid);

  if (!myTrades || myTrades.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          내가 작성한 게시글이 없습니다
        </h3>
        <p className="text-gray-500">게시글을 작성해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">내가 쓴 글</h1>
      <div className="max-h-[500px] space-y-4 overflow-y-auto">
        {myTrades?.map((trade, index) => {
          const isLastElement = index === myTrades.length - 1;

          return (
            <TradeCard
              key={trade.id}
              cardTrade={trade}
              isLastElement={isLastElement}
              ref={ref}
            />
          );
        })}

        <div ref={ref}>{isFetchingNextPage && <div>Loading...</div>}</div>
      </div>
    </div>
  );
}
