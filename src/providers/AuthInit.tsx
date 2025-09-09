"use client";

import { useAuthInit } from "@/hooks/useAuth";

export function AuthInit() {
  useAuthInit(); // Firebase Auth 상태를 Redux와 동기화
  return null; // UI 렌더링하지 않음
}
