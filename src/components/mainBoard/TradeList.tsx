import { CardTrade } from "@/apis/trades/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import TradeCard from "@/components/mainBoard/TradeCard";
import Spinner from "@/components/ui/Spinner";
import TradeCardSkeleton from "../ui/Skeleton/TradeCardSkeleton";

interface TradeListProps {
  cardTrades: CardTrade[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
}

export default function TradeList({
  cardTrades,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}: TradeListProps) {
  const { ref } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <TradeCardSkeleton />
        <TradeCardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {cardTrades.map((cardTrade, index) => {
        const isLastElement = cardTrades.length === index + 1;

        return (
          <TradeCard
            key={cardTrade.id}
            cardTrade={cardTrade}
            isLastElement={isLastElement}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            ref={ref}
          />
        );
      })}

      {isFetchingNextPage && <Spinner />}
    </div>
  );
}
