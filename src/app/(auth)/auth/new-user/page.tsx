import { appModule } from "@/app/module";
import { ProfileFormUpdate } from "@/features/profileUpdate";
import { SessionService } from "@/kernel/lib/nextauth/session.service";
import { isStirng } from "@/shared/lib/isString";
import { Separator } from "@/shared/ui/separator";
import { redirect } from "next/navigation";
import { FC } from "react";

const sessionService = appModule.get(SessionService);

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const NewUserPage: FC<PageProps> = async (props) => {
  const { searchParams } = props;
  const { callbackUrl } = searchParams;

  const session = await sessionService.get();

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return (
    <main className="container space-y-6 py-14">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-medium">The final step</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile, this is how other users will see you on the site
        </p>
      </div>
      <Separator />
      <div className="flex justify-center">
        <ProfileFormUpdate
          profileId={session.user.id}
          callbackUrl={isStirng(callbackUrl)}
          className="max-w-[500px]"
        />
      </div>
    </main>
  );
};

export default NewUserPage;
