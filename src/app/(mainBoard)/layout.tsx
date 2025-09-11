import Header from "@/components/layout/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[80px] w-full max-w-4xl mx-auto px-4">
        {children}
      </main>
    </div>
  );
}
