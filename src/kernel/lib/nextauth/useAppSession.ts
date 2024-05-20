"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useAppSession = useSession;
export const useAppSessionOrRedirect = () => {
  const session = useSession();
  const router = useRouter();
  if (!session) {
    return router.push("/auth/sign-in");
  }
  return session.data;
};
