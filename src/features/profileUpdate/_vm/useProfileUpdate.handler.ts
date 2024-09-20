"use client";
import { useAppSession } from "@/kernel/lib/nextauth";
import { useProfileUpdateMutation } from "../_mutation/useProfileUpdate.mutation";
import { Profile } from "@/kernel/domain/profile/profile.type";
import { useRouter } from "next/dist/client/components/navigation";
import { ProfileFromUpdateValues } from "../_domain/form.schema";

export interface ProfileUpdateHandlerProps {
  data: {
    profileId: string;
  };
  onSuccess?: () => void;
  callbackUrl?: string;
}

export const useProfileUpdateHandler = (props: ProfileUpdateHandlerProps) => {
  const { data, onSuccess, callbackUrl } = props;
  const { profileId } = data;

  const { update: updateSession } = useAppSession();

  const onSuccessWithUpdate = async (profile: Profile) => {
    await updateSession({
      profile,
    });

    onSuccess?.();
    if (callbackUrl) {
      window.location.href = callbackUrl;
    }
  };

  const { profileUpdate, isPending } =
    useProfileUpdateMutation(onSuccessWithUpdate);

  const router = useRouter();

  const handleProfileUpdate = async (profileData: ProfileFromUpdateValues) => {
    await profileUpdate({
      selector: { id: profileId },
      profileData,
    });

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };
  return {
    handleProfileUpdate,
    isPending,
  };
};
