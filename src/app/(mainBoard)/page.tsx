"use client";

import { useGetUser } from "@/apis/auth/queries";
import { useGetCardTrades } from "@/apis/board/queries";
import { CardTrade } from "@/apis/board/types";
import CardTradeForm from "@/components/mainBoard/CardTradeForm";
import TradeList from "@/components/mainBoard/TradeList";
import Button from "@/components/ui/Button/Button";
import SearchInput from "@/components/ui/Input/SearchInput";
import Modal from "@/components/ui/Modal/Modal";
import { useModal } from "@/hooks/useModal";
import { useState } from "react";

export default function MainBoardPage() {
  const [searchTrades, setSearchTrades] = useState<CardTrade[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { openModal, closeModal, isOpen } = useModal();
  const { data: user } = useGetUser();
  const { data: trades } = useGetCardTrades();

  const allTrades = trades?.pages.flatMap((page) => page.trades);
  console.log(allTrades);

  const handleSearchResult = (trades: CardTrade[]) => {
    setSearchTrades(trades);
    setIsSearching(trades.length > 0);
  };

  const displayTrades = isSearching ? searchTrades : allTrades;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
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
        <TradeList cardTrades={displayTrades ?? []} />
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
