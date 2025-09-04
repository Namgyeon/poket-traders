import QueryProvider from "@/providers/query-provider";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { ReduxProvider } from "@/providers/redux-provider";
import "react-loading-skeleton/dist/skeleton.css";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/pretendard/PretendardVariable.woff2",
      weight: "45 920",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-sans">
        <ReduxProvider>
          <QueryProvider>{children}</QueryProvider>
        </ReduxProvider>
        <Toaster
          position="bottom-center"
          richColors
          duration={2000}
          toastOptions={{
            className: "bg-gray-900 text-white",
          }}
        />
      </body>
    </html>
  );
}
