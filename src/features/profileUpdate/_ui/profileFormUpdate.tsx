"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import {
  ProfileForm,
  getProfileQuery,
  profileFormSchema,
} from "@/entities/user/profile";
import { Spinner } from "@/shared/ui/icons/spinner";
import { z } from "zod";
import { useUpdateProfile } from "../_vm/useUpdateProfile";
import { cn } from "@/shared/ui/utils";

interface ProfileFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  callbackUrl?: string;
  className?: string;
}

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const ProfileFormUpdate: FC<ProfileFormProps> = (props) => {
  const { userId, callbackUrl, className } = props;

  const { isPending, data } = useQuery({
    ...getProfileQuery(userId),
    retry: 0,
  });

  const router = useRouter();
  const { update, isPending: isPendingUpdate } = useUpdateProfile();

  if (isPending) {
    return <Spinner aria-label="Загрузка профиля" />;
  }

  if (!data) {
    return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>;
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
        isPending={isPending || isPendingUpdate}
        profile={data.profile}
        submitText={callbackUrl ? "Continue" : "Save change"}
      />
    </div>
  );
};
