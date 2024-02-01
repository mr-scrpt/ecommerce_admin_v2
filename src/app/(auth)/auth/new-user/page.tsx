import { getAppSessionServerOrRedirect } from "@/entities/user/getAppSessionServer";
import { ProfileFormUpdate } from "@/features/profileUpdate";
import { Separator } from "@/shared/ui/separator";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  searchParams: { callbackUrl: string };
}

const NewUserPage: FC<PageProps> = async (props) => {
  const { searchParams } = props;
  const session = await getAppSessionServerOrRedirect();
  return (
    <main className="space-y-6 py-14 container">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-medium">The final step</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile, this is how other users will see you on the site
        </p>
      </div>
      <Separator />
      <div className="flex justify-center">
        <ProfileFormUpdate
          userId={session.user.id}
          callbackUrl={searchParams.callbackUrl}
          className="max-w-[500px]"
        />
      </div>
    </main>
  );
};

export default NewUserPage;
