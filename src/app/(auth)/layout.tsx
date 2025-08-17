export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="w-full max-w-xl">{children}</main>
    </div>
  );
}
