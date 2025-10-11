"use client";

import { useSigninWithGoogle } from "@/apis/auth/queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import clsx from "clsx";

interface GoogleSigninButtonProps {
  className?: string;
  text?: string;
}

export default function GoogleSigninButton({
  className,
  text = "Google로 계속하기",
}: GoogleSigninButtonProps) {
  const router = useRouter();
  const { mutateAsync: googleSignin, isPending } = useSigninWithGoogle();

  const handleGoogleSignin = async () => {
    const signinPromise = googleSignin();

    toast.promise(signinPromise, {
      loading: "Google 로그인 중... ⏳",
      success: (userData) => `🎉 환영합니다, ${userData.nickname}님!`,
      error: (error) => {
        const getErrorMessage = (errorCode: string) => {
          switch (errorCode) {
            case "auth/popup-closed-by-user":
              return "로그인이 취소되었습니다.";
            case "auth/popup-blocked":
              return "팝업이 차단되었습니다. 팝업을 허용해주세요.";
            case "auth/cancelled-popup-request":
              return "로그인 요청이 취소되었습니다.";
            case "auth/network-request-failed":
              return "네트워크 연결을 확인해주세요.";
            case "auth/account-exists-with-different-credential":
              return "이미 다른 방법으로 가입된 이메일입니다.";
            default:
              return "Google 로그인 중 오류가 발생했습니다.";
          }
        };

        const errorMessage = error?.code
          ? getErrorMessage(error.code)
          : error?.message || "알 수 없는 오류가 발생했습니다.";

        return `❌ ${errorMessage}`;
      },
    });

    try {
      await signinPromise;
      router.replace("/");
    } catch (error) {
      console.error("Google signin failed:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignin}
      disabled={isPending}
      className={clsx(
        "w-full flex items-center justify-center gap-3 px-4 py-3",
        "border-2 border-gray-300 rounded-lg font-medium",
        "transition-all duration-200 hover:border-gray-400 hover:bg-gray-50",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {isPending ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      )}
      <span>{text}</span>
    </button>
  );
}
