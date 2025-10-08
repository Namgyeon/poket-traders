"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import UserMenu from "@/components/ui/Dropdown/UserMenu";
import { logout } from "@/apis/auth";
import { toast } from "sonner";
import { useGetUser } from "@/apis/auth/queries";

export default function Header() {
  const {
    user: isAuthenticated,
    loading: userLoading,
    isUserHasFriendId,
  } = useAuth();
  const { data: user } = useGetUser();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      toast.error("로그아웃 실패");
    }
  };

  const options = [
    { value: "내정보", href: "/mypage" },
    { value: "로그아웃", onClick: handleLogout },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 h-18 z-50 flex items-center justify-between py-4 px-8 border-b border-gray bg-white">
      <Link
        href="/"
        className="flex items-center gap-2 hover:bg-gray-200 rounded-md transition-all duration-300"
      >
        <Image
          src="/logo.svg"
          alt="로고 이미지"
          width={30}
          height={30}
          sizes="30px"
          priority={true}
        />
        <p className="text-2xl font-bold">Traders</p>
      </Link>
      {userLoading ? (
        <SkeletonHeader />
      ) : isAuthenticated && user ? (
        <div className="flex items-center gap-4">
          {!isUserHasFriendId && (
            <Link
              href="/mypage"
              className="text-lg font-bold text-red-400 cursor-pointer hover:text-sky-500 hover:bg-gray-200 rounded-md p-2 transition-all animate-bounce duration-300"
            >
              친구 ID 설정 필요
            </Link>
          )}
          <UserMenu user={user} options={options} />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-lg font-bold text-gray-700 cursor-pointer hover:text-sky-500 hover:bg-gray-200 rounded-md p-2 transition-all duration-300"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="text-lg font-bold text-gray-700 cursor-pointer hover:text-sky-500 hover:bg-gray-200 rounded-md p-2 transition-all duration-300"
          >
            회원가입
          </Link>
        </div>
      )}
    </div>
  );
}

function SkeletonHeader() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton circle width={40} height={40} />
      <Skeleton width={80} height={20} />
    </div>
  );
}
