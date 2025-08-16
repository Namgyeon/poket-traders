import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 border-b border-gray">
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
    </div>
  );
}
