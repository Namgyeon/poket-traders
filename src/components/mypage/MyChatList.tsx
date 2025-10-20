"use client";

import { useGetUser } from "@/apis/auth/queries";
import { getMyChatRooms } from "@/apis/chat";

export default function MyChatList() {
  const { data: user } = useGetUser();

  return <div>MyChatList</div>;
}
