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
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">내 게시글</h1>
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
