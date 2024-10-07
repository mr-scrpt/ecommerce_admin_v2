"use client";
import { Button } from "@/shared/ui/button";
import { LogOut as IconLogOut, LogIn as IconLogIn } from "lucide-react";
import { FC, HTMLAttributes, forwardRef } from "react";
import { useSignInModel } from "../../_vm/useSignIn.model";
import { useSignOutModel } from "../../_vm/useSignOut.model";
import { useAppSession } from "@/kernel/lib/nextauth";
import { AuthStatus } from "@/kernel/domain/auth/auth.type";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/ui/utils";

interface AuthPresentationProps extends HTMLAttributes<HTMLDivElement> {}

export const AuthPresentationBase: FC<AuthPresentationProps> = (props) => {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};

const ButtonLogOut = forwardRef<
  HTMLButtonElement,
  HTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { children, className, ...rest } = props;
  const { signOut, isPending } = useSignOutModel();

  const { status } = useAppSession();

  if (status === AuthStatus.LOADING) return <Skeleton className="h-8 w-8" />;
  if (status === AuthStatus.UNAUTHENTICATED) return null;

  return (
    <Button
      ref={ref}
      {...rest}
      variant="outline"
      onClick={() => signOut()}
      disabled={isPending}
      className={cn(className, "flex justify-center gap-2")}
    >
      <IconLogOut className="h-4 w-4" />

      <span>Log out</span>
    </Button>
  );
});

ButtonLogOut.displayName = "ButtonLogOut";

const ButtonLogIn = forwardRef<
  HTMLButtonElement,
  HTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { children, className, ...rest } = props;
  const { signIn, isPending } = useSignInModel();

  const { status } = useAppSession();

  if (status === AuthStatus.LOADING) return <Skeleton className="h-8 w-8" />;
  if (status === AuthStatus.AUTHENTICATED) return null;

  return (
    <Button
      ref={ref}
      {...rest}
      onClick={() => signIn()}
      disabled={isPending}
      className={cn(className, "flex justify-center gap-2")}
    >
      <IconLogIn className="h-4 w-4" />
      <span>Log in</span>
    </Button>
  );
});

ButtonLogIn.displayName = "ButtonLogIn";

export const AuthPresentation = Object.assign(AuthPresentationBase, {
  ButtonLogOut,
  ButtonLogIn,
});
