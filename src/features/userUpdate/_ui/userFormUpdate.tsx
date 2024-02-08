// "use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { UserForm, getUserQuery, userFormSchema } from "@/entities/user/user";
import { Spinner } from "@/shared/ui/icons/spinner";
import { z } from "zod";
// import { useUserUpdate } from "../__vm/useUserUpdate";
import { cn } from "@/shared/ui/utils";
import { useUserUpdateMutation } from "../_mutation/useUserUpdate.mutation";
import { useUserUpdate } from "../_vm/useUserUpdate";
import { Button } from "@/shared/ui/button";

interface UserFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  callbackUrl?: string;
  className?: string;
}

type UserFormValues = z.infer<typeof userFormSchema>;

export const UserFormUpdate: FC<UserFormProps> = (props) => {
  const { userId, callbackUrl, className } = props;

  const { isPending, data } = useQuery({
    ...getUserQuery(userId),
    retry: 0,
  });

  const router = useRouter();

  const {
    update,
    // userUpdateEvent,
    isPending: isPendingUpdate,
  } = useUserUpdate();

  if (isPending) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!data) {
    return <div>Failed to load user, you may not have permissions</div>;
  }

  // data.user.role
  const handleSubmit = async (data: UserFormValues) => {
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
      {/* <Button onClick={userUpdateEvent}>click</Button> */}
      <UserForm
        handleSubmit={handleSubmit}
        isPending={isPending || isPendingUpdate}
        user={data.user}
        submitText={"Save change"}
      />
    </div>
  );
};
