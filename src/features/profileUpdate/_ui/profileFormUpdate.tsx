"use client";
import { useProfileQuery } from "@/entities/user/_query/profile.query";
import { ProfileForm, profileFormSchema } from "@/entities/user/profile";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useProfileUpdate } from "../_vm/useProfileUpdate";

interface ProfileFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  callbackUrl?: string;
  className?: string;
}

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const ProfileFormUpdate: FC<ProfileFormProps> = (props) => {
  const { userId, callbackUrl, className } = props;

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
      />
    </div>
  );
};
