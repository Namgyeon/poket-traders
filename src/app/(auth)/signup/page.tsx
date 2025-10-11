import GoogleSigninButton from "@/components/auth/GoogleSigninButton";
import SignupForm from "@/components/auth/SignupForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "회원가입 | Poket Traders",
  description: "Poket Traders에 회원가입하여 포켓몬 카드 거래를 시작하세요",
  keywords: "포켓 포켓몬, 카드, 거래, 회원가입",
  openGraph: {
    title: "회원가입 | Poket Traders",
    description: "Poket Traders에 회원가입하여 포켓몬 카드 거래를 시작하세요",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
      <p>
        이미 계정이 있으신가요?{" "}
        <Link href="/signin" className="underline hover:text-sky-500">
          로그인
        </Link>
      </p>
      <div className="w-full max-w-md">
        <GoogleSigninButton />
      </div>
    </div>
  );
}
