import { Separator } from "@/shared/ui/separator";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const NewUserPage: FC<PageProps> = (props) => {
  return (
    <main className="space-y-6 py-14 container">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-medium">The final step</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile, this is how other users will see you on the site
        </p>
      </div>
      <Separator />
      {/* <UpdateProfileForm */}
      {/*   userId={session.user.id} */}
      {/*   callbackUrl={searchParams.callbackUrl} */}
      {/* /> */}
    </main>
  );
};

export default NewUserPage;
