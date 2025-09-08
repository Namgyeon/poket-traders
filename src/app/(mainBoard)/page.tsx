"use client";

import { useGetCardTrades } from "@/apis/board/queries";
import CardTradeForm from "@/components/mainBoard/CardTradeForm";
import Modal from "@/components/ui/Modal/Modal";
import { useModal } from "@/hooks/useModal";

export default function MainBoardPage() {
  const { openModal, closeModal, isOpen } = useModal();
  const { data: cardTrades } = useGetCardTrades();
  console.log(cardTrades);
  return (
    <div>
      <button onClick={openModal}>모달 오픈</button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <CardTradeForm />
      </Modal>
    </div>
  );
}
