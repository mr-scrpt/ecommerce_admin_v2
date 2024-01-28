"use client";
import { Button } from "@/shared/ui/button";
import { LogIn as IconLogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { FC, HTMLAttributes } from "react";

interface SignInButtonProps extends HTMLAttributes<HTMLDivElement> {}

export const SignInButton: FC<SignInButtonProps> = (props) => {
  const handleSignOut = () => signIn();

  return (
    <Button variant={"outline"} onClick={handleSignOut}>
      <IconLogIn className="mr-2 h-4 w-4" /> Log in
    </Button>
  );
};
