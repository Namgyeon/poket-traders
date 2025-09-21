// src/components/mypage/MyCommentList.tsx
"use client";

import { useGetUser } from "@/apis/auth/queries";
import { useGetCardTrades, useGetUserComments } from "@/apis/trades/queries";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useRouter } from "next/navigation";
import TradeCard from "@/components/mainBoard/TradeCard";
import Spinner from "@/components/ui/Spinner";

export default function MyCommentList() {
  const { data: user } = useGetUser();
  const router = useRouter();

  const { data: myComments } = useGetUserComments(user?.uid || "");
  const commentedTradesIds = myComments?.pages
    .flatMap((page) => page.comments)
    .map((comment) => comment.tradeId);

  const {
    data: allTrades,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useGetCardTrades();

  const commentedTrades = allTrades?.pages
    .flatMap((page) => page.trades)
    .filter((trade) => commentedTradesIds?.includes(trade.id));

  const { ref } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (!commentedTrades || commentedTrades.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          댓글을 단 게시글이 없습니다
        </h3>
        <p className="text-gray-500">게시글에 댓글을 남겨보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">댓글 단 글</h1>
      <div className="max-h-[600px] space-y-4 overflow-y-auto">
        {commentedTrades?.map((trade, index) => {
          const isLastElement = index === commentedTrades.length - 1;

          return (
            <div key={trade.id} className="relative">
              <TradeCard
                isLoading={isLoading}
                isFetchingNextPage={isFetchingNextPage}
                cardTrade={trade}
                isLastElement={isLastElement}
                ref={ref}
              />

              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                💬 댓글 참여
              </div>
            </div>
          );
        })}

        <div ref={ref}>{isFetchingNextPage && <Spinner />}</div>
      </div>
    </div>
  );
}
