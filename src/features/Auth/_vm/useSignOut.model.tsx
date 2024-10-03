"use client";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useSignOutModel = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => signOut({ callbackUrl: "/" }),
    onSuccess: async () => {
      router.push("/auth/sign-in");
    },
  });

  return {
    signOut: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};
