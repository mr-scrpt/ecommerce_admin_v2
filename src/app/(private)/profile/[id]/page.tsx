import { ProfileFormUpdate } from "@/features/profileUpdate";
import { Separator } from "@/shared/ui/separator";
import { FC } from "react";

interface PageProfileProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const PageProfile: FC<PageProfileProps> = (props) => {
  const { params } = props;
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This information about you is seen by other users on the site
        </p>
      </div>
      <Separator />
      <ProfileFormUpdate profileId={params.id} />
    </main>
  );
};
export default PageProfile;
