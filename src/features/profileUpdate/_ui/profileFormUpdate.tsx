"use client";
import { useProfileQuery } from "@/entities/user/_query/profile.query";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { useProfileUpdate } from "../_vm/useProfileUpdate";
import { ProfileFormElements } from "@/entities/user/profile";
import {
  ProfileFromUpdateValues,
  profileFormUpdateSchema,
} from "../_domain/form.schema";

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
    data,
  } = useProfileQuery(profileId);

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

  const handleSubmit = async (data: ProfileFromUpdateValues) => {
    await update({
      profileId,
      data,
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
        profile={data.profile}
        schema={profileFormUpdateSchema}
      >
        <ProfileFormElements.FieldEmail />
        <ProfileFormElements.FieldName />
        <ProfileFormElements.FieldPhone />
        <ProfileFormElements.FieldAvatar profile={data.profile} />
        <ProfileFormElements.SubmitButton
          isPending={isPendingComplexible}
          submitText="Save change"
        />
      </ProfileFormElements>
    </div>
  );
};
