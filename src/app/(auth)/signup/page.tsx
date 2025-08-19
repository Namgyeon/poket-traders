import GoogleSigninButton from "@/components/auth/GoogleSigninButton";
import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";

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
