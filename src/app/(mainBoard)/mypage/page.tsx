import AuthGuard from "@/components/auth/AuthGuard";
import MyChatList from "@/components/mypage/MyChatList";
import MyCommentList from "@/components/mypage/MyCommentList";
import MyTradeCardList from "@/components/mypage/MyTradeCardList";
import UserInfoUpdateForm from "@/components/mypage/UserInfoUpdateForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지 | Poket Traders",
  description: "내 정보를 확인하고 관리할 수 있는 마이페이지입니다",
  robots: {
    index: false, // 개인정보 페이지
    follow: false, // 링크 따라가지 않음
  },
};

export default function MyPage() {
  return (
    <AuthGuard redirectTo="/">
      <div className="flex gap-8">
        <MyChatList />
        <div className="py-8 space-y-10">
          <UserInfoUpdateForm />
          <MyTradeCardList />
          <MyCommentList />
        </div>
      </div>
    </AuthGuard>
  );
}
