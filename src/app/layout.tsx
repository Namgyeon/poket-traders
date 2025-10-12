import QueryProvider from "@/providers/query-provider";
import { ReduxProvider } from "@/providers/redux-provider";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import "react-loading-skeleton/dist/skeleton.css";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://poket-traders.vercel.app"),
  title: {
    default: "Poket Traders",
    template: "%s | Poket Traders",
  },
  description: "Poket Traders는 포켓몬 카드 거래를 위한 커뮤니티 사이트입니다.",
  keywords: ["포켓몬", "카드", "거래", "포켓", "포켓 포켓몬"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Poket Traders",
    images: [
      {
        url: "/main-logo.svg",
        width: 1200,
        height: 630,
        alt: "Poket Traders Logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "OJNOfCx3hobxftrgDWvrYZIxzpokn1fRF2tRXTV8FRc",
  },
};

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
