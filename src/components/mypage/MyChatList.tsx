"use client";

import { useGetUser } from "@/apis/auth/queries";
import { useGetMyChatRooms } from "@/apis/chat/queries";
import { ChatRoom } from "@/apis/chat/types";
import { useModal } from "@/hooks/useModal";
import { useMemo, useState } from "react";
import Modal from "../ui/Modal/Modal";
import ChatModal from "../chat/ChatModal";

export default function MyChatList() {
  const [selectedChatRoom, setSelectedChatRoom] = useState<{
    chatRoomId: string;
    otherUserNickname: string;
  } | null>(null);

  const { data: user } = useGetUser();
  const { data: myChatList } = useGetMyChatRooms(user?.uid);

  const { openModal, closeModal, isOpen } = useModal();

  const processedChatList = useMemo(() => {
    if (!myChatList || !user?.uid) return [];

    return myChatList
      .map((chat) => {
        const otherUserId = chat.participants.find((id) => id !== user?.uid);
        const otherUserInfo = otherUserId
          ? chat.participantInfo[otherUserId]
          : null;
        if (!otherUserId || !otherUserInfo) return null;

        return {
          chat,
          otherUserId,
          otherUserName: otherUserInfo.name,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null); // 타입가드를 사용하여 null이 아님을 확신.
  }, [myChatList, user?.uid]);

  const handleClickChatRoom = (
    chatRoom: ChatRoom,
    otherUserNickname: string
  ) => {
    setSelectedChatRoom({
      chatRoomId: chatRoom.id,
      otherUserNickname: otherUserNickname,
    });
    openModal();
  };

  return (
    <>
      <div className="space-y-4 p-4">
        {processedChatList?.map(({ chat, otherUserName }) => {
          return (
            <div
              key={chat.id}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
              onClick={() => handleClickChatRoom(chat, otherUserName)}
            >
              <span className="max-w-[50px] truncate px-2 py-4 text-lg font-semibold bg-gray-200 rounded-lg">
                {otherUserName}
              </span>
              <div className="flex w-[300px] justify-between gap-4">
                <p className="text-md font-semibold">{chat.tradeCardTitle}</p>
                <p className="text-sm text-gray-500">
                  {chat.lastMessageAt?.toLocaleString("ko-KR", {
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedChatRoom && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          header={selectedChatRoom.otherUserNickname}
        >
          <ChatModal chatRoomId={selectedChatRoom.chatRoomId} />
        </Modal>
      )}
    </>
  );
}
