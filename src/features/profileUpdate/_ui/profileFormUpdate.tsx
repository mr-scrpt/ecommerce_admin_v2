"use client";
import { useProfileQuery } from "@/entities/user/_query/profile.query";
import { ProfileForm, ProfileFormValues } from "@/entities/user/profile";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { useProfileUpdate } from "../_vm/useProfileUpdate";

interface ProfileFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  callbackUrl?: string;
  className?: string;
  countryDefault?: string;
}

export const ProfileFormUpdate: FC<ProfileFormProps> = (props) => {
  const { userId, callbackUrl, countryDefault, className } = props;

  const {
    isPending: isPendingProfile,
    isFetchedAfterMount,
    data,
  } = useProfileQuery(userId);
  const router = useRouter();

  const { update, isPending: isPendingUpdate } = useProfileUpdate();

  const isPendingComplexible =
    isPendingProfile || isPendingUpdate || !isFetchedAfterMount;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!data) {
    return <div>Failed to load profile, you may not have permissions</div>;
  }

  const handleSubmit = async (data: ProfileFormValues) => {
    console.log("output_log: form send =>>>", data);
    await update({
      userId,
      data,
    });
    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <ProfileForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        profile={data.profile}
        submitText={callbackUrl ? "Continue" : "Save change"}
        countryDefault={countryDefault}
      />
    </div>
  );
};
