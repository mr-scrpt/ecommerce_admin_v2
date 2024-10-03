import { Profile } from "@/kernel/domain/profile/profile.type";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";

interface ProfileProviderProps {
  profile: Profile | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

// NOTE: Single Profile
export const ProfileContext = createStrictContext<ProfileProviderProps>();
export const useProfileData = () => useStrictContext(ProfileContext);

// NOTE: List Profile
export const ProfileListContext =
  createStrictContext<Array<ProfileProviderProps>>();
export const useProfileListData = () => useStrictContext(ProfileListContext);
