"use client";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export const useSignInModel = () => {
  // const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => signIn(),
    // onSuccess: async () => {
    //   router.push("/auth/sign-in");
    // },
  });

  return {
    signIn: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};
