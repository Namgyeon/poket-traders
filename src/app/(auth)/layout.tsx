import Image from "next/image";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <header className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
        <Image
          src="/main-logo.svg"
          alt="logo"
          fill
          className="object-contain rounded-lg"
          priority={true}
          sizes="(max-width: 640px) 128px, (max-width: 768px) 192px"
        />
      </header>
      <main className="w-full max-w-xl">{children}</main>
    </div>
  );
}
