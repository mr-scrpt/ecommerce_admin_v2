"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { ProfileForm } from "./profileForm";

interface ProfileFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  callbackUrl?: string;
}

export const ProfileFormUpdate: FC<ProfileFormProps> = (props) => {
  const { userId, callbackUrl } = props;
  // const profileQuery = useQuery({
  //   ...getProfileQuery(userId),
  //   retry: 0,
  // });

  const router = useRouter();
  const handleSuccess = () => {
    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  // if (profileQuery.isPending) {
  //   return <Spinner aria-label="Загрузка профиля" />;
  // }
  //
  // if (!profileQuery.data) {
  //   return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>;
  // }

  return (
    <ProfileForm
      userId={userId}
      profile={{ email: "", name: "" }}
      onSuccess={handleSuccess}
      submitText={callbackUrl ? "Продолжить" : "Сохранить"}
    />
  );
};
