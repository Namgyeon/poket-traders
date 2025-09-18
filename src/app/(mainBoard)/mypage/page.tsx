import MyTradeCardList from "@/components/mypage/MyTradeCardList";
import UserInfoUpdateForm from "@/components/mypage/UserInfoUpdateForm";

export default function MyPage() {
  return (
    <div className="space-y-10">
      <UserInfoUpdateForm />
      <MyTradeCardList />
    </div>
  );
}
