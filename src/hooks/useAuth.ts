"use client";

import { useGetUser } from "@/apis/auth/queries";
import { User } from "@/apis/auth/types";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: user, isLoading } = useGetUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setIsAuthenticated(!!firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isUserHasFriendId = (user: User | null | undefined) => {
    if (!user) return false;
    return user.friendId !== "";
  };

  return {
    user: isAuthenticated ? user : null,
    loading: loading || isLoading,
    isUserHasFriendId: isUserHasFriendId(user),
  };
}
