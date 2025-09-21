"use client";

import { useGetUser } from "@/apis/auth/queries";
import { useGetCardTrades } from "@/apis/trades/queries";
import { CardTrade } from "@/apis/trades/types";
import CardTradeForm from "@/components/mainBoard/CardTradeForm";
import TradeList from "@/components/mainBoard/TradeList";
import Button from "@/components/ui/Button/Button";
import SearchInput from "@/components/ui/Input/SearchInput";
import Modal from "@/components/ui/Modal/Modal";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function MainBoardPage() {
  const [searchTrades, setSearchTrades] = useState<CardTrade[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { isUserHasFriendId } = useAuth();

  const { openModal, closeModal, isOpen } = useModal();
  const { data: user } = useGetUser();
  const {
    data: trades,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetCardTrades();
  const router = useRouter();

  const allTrades = useMemo(() => {
    return trades?.pages.flatMap((page) => page.trades) ?? [];
  }, [trades]);

  const handleSearchResult = (trades: CardTrade[]) => {
    setSearchTrades(trades);
    setIsSearching(trades.length > 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <SearchInput
          placeholder="원하는 카드를 검색"
          className="flex-1"
          allTrades={allTrades ?? []}
          onSearchResult={handleSearchResult}
        />
        <Button variant="primary" onClick={openModal} className="flex-1">
          거래 등록
        </Button>
      </div>

      <div>
        {isSearching ? (
          <TradeList
            cardTrades={searchTrades}
            fetchNextPage={() => {}}
            hasNextPage={false}
            isLoading={isLoading}
            isFetchingNextPage={false}
          />
        ) : (
          <TradeList
            cardTrades={allTrades ?? []}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        header={user ? "게시글 등록" : ""}
      >
        {!user ? (
          <div className="p-6 text-center">
            <p className="text-gray-600 mb-4">로그인이 필요합니다.</p>
            <Button
              onClick={() => {
                closeModal();
                router.push("/signin");
              }}
              variant="primary"
              type="button"
            >
              로그인하러 가기
            </Button>
          </div>
        ) : !isUserHasFriendId ? (
          <div className="p-6 text-center">
            <p className="text-gray-600 mb-4">친구 ID가 설정되지 않았습니다.</p>
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                router.push("/mypage");
              }}
            >
              친구 ID 설정하러 가기
            </Button>
          </div>
        ) : (
          <CardTradeForm user={user} onClose={closeModal} />
        )}
      </Modal>
    </div>
  );
}
