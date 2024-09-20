import { useProfileQuery } from "@/entities/profile";
import { ProfileFromUpdateValues } from "../_domain/form.schema";

interface CategoryDefaultValueProps {
  profileId: string;
}

export const useCategoryUpdateValues = (props: CategoryDefaultValueProps) => {
  const { profileId } = props;
  const {
    isPending: isPendingProfile,
    isFetchedAfterMount: isFetchedAfterMountProfile,
    data: profile,
  } = useProfileQuery(profileId);

  const profileUpdateValues: ProfileFromUpdateValues = {
    name: profile?.name || "",
    lastName: profile?.lastName || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    image: profile?.image || "",
  };

  return { profileUpdateValues, isPendingProfile, isFetchedAfterMountProfile };
};
