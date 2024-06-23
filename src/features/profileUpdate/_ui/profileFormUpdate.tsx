"use client";
import { useProfileQuery } from "@/entities/user/_query/profile.query";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { useProfileUpdateModel } from "../_vm/useProfileUpdate.model";
import { ProfileFormElements } from "@/entities/user/profile";
import {
  ProfileFromUpdateValues,
  profileFormUpdateSchema,
} from "../_domain/schema";

interface ProfileFormProps extends HTMLAttributes<HTMLDivElement> {
  profileId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const ProfileFormUpdate: FC<ProfileFormProps> = (props) => {
  const { profileId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingProfile,
    isFetchedAfterMount,
    data: profile,
  } = useProfileQuery(profileId);

  const router = useRouter();

  const { update, isPending: isPendingUpdate } = useProfileUpdateModel();

  const isPendingComplexible =
    isPendingProfile || isPendingUpdate || !isFetchedAfterMount;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!profile) {
    return <div>Failed to load profile, you may not have permissions</div>;
  }

  const handleSubmit = async (profileData: ProfileFromUpdateValues) => {
    await update({
      id: profileId,
      ...profileData,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <ProfileFormElements
        handleSubmit={handleSubmit}
        profile={profile}
        schema={profileFormUpdateSchema}
      >
        <ProfileFormElements.FieldEmail />
        <ProfileFormElements.FieldName />
        <ProfileFormElements.FieldPhone />
        <ProfileFormElements.FieldAvatar profile={profile} />
        <ProfileFormElements.SubmitButton
          isPending={isPendingComplexible}
          submitText="Save change"
        />
      </ProfileFormElements>
    </div>
  );
};
