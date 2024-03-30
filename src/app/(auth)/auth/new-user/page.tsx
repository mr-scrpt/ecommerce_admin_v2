import { getAppSessionServerOrRedirect } from "@/shared/session/getAppSessionServer";
import { ProfileFormUpdate } from "@/features/profileUpdate";
import { Separator } from "@/shared/ui/separator";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  searchParams: { callbackUrl: string };
}

const NewUserPage: FC<PageProps> = async (props) => {
  const { searchParams } = props;
  const { callbackUrl } = searchParams;
  const session = await getAppSessionServerOrRedirect();
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
          userId={session.user.id}
          callbackUrl={callbackUrl}
          className="max-w-[500px]"
          countryDefault={session.clientNetworkData.country ?? "UA"}
        />
      </div>
    </main>
  );
};

export default NewUserPage;
