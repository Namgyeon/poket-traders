import GoogleSigninButton from "@/components/auth/GoogleSigninButton";
import SigninForm from "@/components/auth/SigninForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "로그인 | Poket Traders",
  description: "Poket Traders에 로그인하여 포켓몬 카드 거래를 시작하세요",
  keywords: "포켓 포켓몬, 카드, 거래, 로그인",
  openGraph: {
    title: "로그인 | Poket Traders",
    description: "Poket Traders에 로그인하여 포켓몬 카드 거래를 시작하세요",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="w-full max-w-md">
        <SigninForm />
      </div>
      <p>
        계정이 없으신가요?{" "}
        <Link href="/signup" className="underline hover:text-sky-500">
          회원가입
        </Link>
      </p>
      <div className="w-full max-w-md">
        <GoogleSigninButton />
      </div>
    </div>
  );
}
