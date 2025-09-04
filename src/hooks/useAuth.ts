"use client";

import { useGetUser } from "@/apis/auth/queries";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuth() {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const { data: user, isLoading: userLoading } = useGetUser();

  return {
    user: firebaseUser && !authLoading ? user : null,
    userLoading: authLoading || userLoading,
  };
}
