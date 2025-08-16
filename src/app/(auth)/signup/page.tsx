import SignupForm from "@/components/auth/SignupForm";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
        <Image
          src="/main-logo.svg"
          alt="logo"
          fill
          className="object-contain rounded-lg"
          priority={true}
          sizes="(max-width: 640px) 128px, (max-width: 768px) 192px"
        />
      </div>
      <div className="w-full max-w-lg">
        <SignupForm />
      </div>
    </div>
  );
}
