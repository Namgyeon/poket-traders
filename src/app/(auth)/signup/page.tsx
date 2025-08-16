import SignupForm from "@/components/auth/SignupForm";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div>
      <div>
        <Image src="/main-logo.svg" alt="logo" width={100} height={100} />
      </div>
      <SignupForm />
    </div>
  );
}
