import Header from "@/components/layout/Header";
import SideBar from "@/components/mypage/SideBar";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex gap-20 pt-[90px]">
        <aside className="max-w-[450px] w-full">
          <SideBar />
        </aside>
        <main className="flex-1 py-8 max-w-4xl">{children}</main>
      </div>
    </div>
  );
}
