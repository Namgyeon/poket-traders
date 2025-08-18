import GoogleSigninButton from "@/components/auth/GoogleSigninButton";
import SigninForm from "@/components/auth/SigninForm";
import Link from "next/link";

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
