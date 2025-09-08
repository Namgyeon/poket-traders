"use client";

import { useGetCardTrades } from "@/apis/board/queries";

export default function MainBoardPage() {
  const { data: cardTrades } = useGetCardTrades();
  console.log(cardTrades);
  return <div>MainBoardPage</div>;
}
