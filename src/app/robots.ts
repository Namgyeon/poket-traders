import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://poket-traders.vercel.app"; // 실제 배포 URL로 변경

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/mypage/", "/api/"], // 개인정보 페이지 차단
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
