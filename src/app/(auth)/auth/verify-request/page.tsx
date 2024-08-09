import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { FC } from "react";

const VerifyRequestPage: FC = () => {
  return (
    <div className="container relative  flex-col items-center justify-center self-center pt-24">
      <Card className="mx-auto max-w-[350px]">
        <CardHeader className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Check your e-mail
          </h1>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="px-0 text-center text-sm text-muted-foreground">
            A login link has been sent to your email address.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyRequestPage;
