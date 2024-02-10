"use client";
import { useProfileQuery } from "@/entities/user/_query/profile.query";
import { useListenProfileUpdate } from "@/entities/user/_vm/event/useListenProfileUpdate";
import { ProfileForm, profileFormSchema } from "@/entities/user/profile";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useProfileUpdate } from "../_vm/useProfileUpdate";
import { socketClient } from "@/shared/config/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useEmitUserCreate } from "@/entities/user/_vm/event/useEmitUserCreate";

interface ProfileFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  callbackUrl?: string;
  className?: string;
}

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const ProfileFormUpdate: FC<ProfileFormProps> = (props) => {
  const { userId, callbackUrl, className } = props;

  const { isPending, data } = useProfileQuery(userId);
  const router = useRouter();

  // useListenProfileUpdate();

  const { update, isPending: isPendingUpdate } = useProfileUpdate();
  // const { userCreateEvent } = useEmitUserCreate();

  if (isPending) {
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

  // const socket = socketClient("");
  // socket.connect();
  // console.log("output_log: on create user =>>>", socket);
  // socket.emit(WSEventEnum.USER_CREATE);
  // socket.disconnect();

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
