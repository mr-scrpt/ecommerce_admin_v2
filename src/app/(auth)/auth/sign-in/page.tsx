import { FC, HTMLAttributes } from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import Link from "next/link";
import { SignInForm } from "@/features/Auth/SignInForm";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageSignIn: FC<PageProps> = (props) => {
  return (
    <main className="container relative  flex-col items-center justify-center self-center pt-24">
      <Card className="max-w-[350px] mx-auto">
        <CardHeader className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to your account
          </h1>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignInForm />
          <p className="text-center text-sm text-muted-foreground">
            By clicking continue you agree to
            <Link
              href="/terms"
              className="p-1 underline underline-offset-4 hover:text-primary"
            >
              User Agreement
            </Link>
            and
            <Link
              href="/privacy"
              className="p-1 underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};
export default PageSignIn;
