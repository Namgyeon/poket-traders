import AuthGuard from "@/components/auth/AuthGuard";
import MyCommentList from "@/components/mypage/MyCommentList";
import MyTradeCardList from "@/components/mypage/MyTradeCardList";
import UserInfoUpdateForm from "@/components/mypage/UserInfoUpdateForm";

export default function MyPage() {
  return (
    <AuthGuard redirectTo="/">
      <div className="py-8 space-y-10">
        <UserInfoUpdateForm />
        <MyTradeCardList />
        <MyCommentList />
      </div>
    </AuthGuard>
  );
}
