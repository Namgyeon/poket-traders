"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/ui/Spinner";
import { toast } from "sonner";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo: string;
}

export default function AuthGuard({ children, redirectTo }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo);
      toast.error("로그인이 필요합니다.");
    }
  }, [user, loading]);

  if (loading || !user) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <Spinner />
        <p>로그인 중입니다...</p>
      </div>
    );
  }

  return <>{children}</>;
}
