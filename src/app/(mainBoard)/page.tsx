import MainBoardContainer from "@/components/mainBoard/MainBoardContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "거래 게시판 | Poket Traders",
  description:
    "Poket Traders에 거래 게시판을 통해 포켓몬 카드 거래를 시작하세요",
  keywords: "포켓몬, 카드, 거래, 거래 게시판",
  openGraph: {
    title: "거래 게시판 | Poket Traders",
    description:
      "Poket Traders에 거래 게시판을 통해 포켓몬 카드 거래를 시작하세요",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MainBoardPage() {
  return <MainBoardContainer />;
}
