"use client";
import { ProfileFormElements } from "@/entities/profile";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { profileFormUpdateSchema } from "../_domain/form.schema";
import { useProfileUpdateHandler } from "../_vm/useProfileUpdate.handler";
import { useCategoryUpdateValues } from "../_vm/useProfileUpdateValues.model";

interface ProfileFormProps extends HTMLAttributes<HTMLDivElement> {
  profileId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const ProfileFormUpdate: FC<ProfileFormProps> = (props) => {
  const { profileId, callbackUrl, className, onSuccess } = props;

  const { profileUpdateValues, isPendingProfile, isFetchedAfterMountProfile } =
    useCategoryUpdateValues({ profileId });

  const { handleProfileUpdate, isPending: isPendingUpdate } =
    useProfileUpdateHandler({
      data: { profileId },
      onSuccess,
      callbackUrl,
    });

  const isPendingComplexible =
    isPendingProfile || isPendingUpdate || !isFetchedAfterMountProfile;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  // if (!profile) {
  //   return <div>Failed to load profile, you may not have permissions</div>;
  // }

  // const handleSubmit = async (profileData: ProfileFromUpdateValues) => {
  //   await update({
  //     selector: { id: profileId },
  //     profileData,
  //     // id: profileId,
  //     // ...profileData,
  //   });
  //
  //   onSuccess?.();
  //
  //   if (callbackUrl) {
  //     router.push(callbackUrl);
  //   }
  // };

  return (
    <div className={cn(className, "w-full")}>
      <ProfileFormElements
        handleSubmit={handleProfileUpdate}
        defaultValues={profileUpdateValues}
        schema={profileFormUpdateSchema}
      >
        <ProfileFormElements.FieldEmail />
        <ProfileFormElements.FieldName />
        <ProfileFormElements.FieldLastName />
        <ProfileFormElements.FieldPhone />
        <ProfileFormElements.FieldAvatar />
        <ProfileFormElements.SubmitButton
          isPending={isPendingComplexible}
          submitText="Save change"
        />
      </ProfileFormElements>
    </div>
  );
};
