import Header from "@/components/layout/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[90px] py-8 w-full max-w-4xl mx-auto">
        {children}
      </main>
    </div>
  );
}
