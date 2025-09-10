"use client";

import { useGetUser } from "@/apis/auth/queries";
import { useGetCardTrades } from "@/apis/board/queries";
import CardTradeForm from "@/components/mainBoard/CardTradeForm";
import Modal from "@/components/ui/Modal/Modal";
import { useModal } from "@/hooks/useModal";

export default function MainBoardPage() {
  const { openModal, closeModal, isOpen } = useModal();
  const { data: user } = useGetUser();
  const { data: cardTrades } = useGetCardTrades();
  console.log("유저정보:", user);
  console.log("카드 거래 정보:", cardTrades);
  return (
    <div>
      <button onClick={openModal}>모달 오픈</button>
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
