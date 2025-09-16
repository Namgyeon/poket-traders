import { CardTrade } from "@/apis/board/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import TradeCard from "./TradeCard";

interface TradeListProps {
  cardTrades: CardTrade[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function TradeList({
  cardTrades,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: TradeListProps) {
  const { ref } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div className="space-y-6">
      {cardTrades.map((cardTrade, index) => {
        const isLastElement = cardTrades.length === index + 1;

        return (
          <TradeCard
            key={cardTrade.id}
            cardTrade={cardTrade}
            isLastElement={isLastElement}
            ref={ref}
          />
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
