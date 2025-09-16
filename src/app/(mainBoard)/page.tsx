"use client";

import { useGetUser } from "@/apis/auth/queries";
import { useGetCardTrades, useGetComments } from "@/apis/board/queries";
import { CardTrade } from "@/apis/board/types";
import CardTradeForm from "@/components/mainBoard/CardTradeForm";
import EmptySearchResults from "@/components/mainBoard/EmptySearchResults";
import TradeList from "@/components/mainBoard/TradeList";
import Button from "@/components/ui/Button/Button";
import SearchInput from "@/components/ui/Input/SearchInput";
import Modal from "@/components/ui/Modal/Modal";
import { useModal } from "@/hooks/useModal";
import { useMemo, useState } from "react";

export default function MainBoardPage() {
  const [searchTrades, setSearchTrades] = useState<CardTrade[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { openModal, closeModal, isOpen } = useModal();
  const { data: user } = useGetUser();
  const {
    data: trades,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCardTrades();

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
            isFetchingNextPage={false}
          />
        ) : (
          <TradeList
            cardTrades={allTrades ?? []}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} header="게시글 등록">
        {user ? (
          <CardTradeForm user={user} onClose={closeModal} />
        ) : (
          <div>로그인 후 이용해주세요.</div>
        )}
      </Modal>
    </div>
  );
}
