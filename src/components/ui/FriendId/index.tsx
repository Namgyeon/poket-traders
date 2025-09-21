"use client";

import { toast } from "sonner";

interface FriendIdProps {
  friendId: string;
}

export default function FriendId({ friendId }: FriendIdProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(friendId);
      toast.success("친구 ID가 복사되었습니다.");
    } catch (error) {
      toast.error("다시 시도해주세요.");
    }
  };

  return (
    <div
      className="bg-blue-100 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-all duration-300"
      onClick={handleCopy}
    >
      <p>
        <span className="font-bold text-gray-700">친구 ID : </span>
        {friendId}
      </p>
    </div>
  );
}
