import { useUserQuery } from "@/entities/user/_query/user.query";
import {
  UserFormElements,
  userCreateSchema,
  userFormSchema,
} from "@/entities/user/user";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useUserUpdate } from "../_vm/useUserUpdate";
import { UserUpdateFormValues, userUpdateFormSchema } from "../domain/schema";

interface UserFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type UserFormValues = z.infer<typeof userFormSchema>;

export const UserFormUpdate: FC<UserFormProps> = (props) => {
  const { userId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingUser,
    isFetchedAfterMount,
    data,
  } = useUserQuery(userId);
  const router = useRouter();

  const { userUpdate, isPending: isPendingUpdate } = useUserUpdate();

  const isPendingComplexible =
    isPendingUpdate || isPendingUser || !isFetchedAfterMount;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!data) {
    return <div>Failed to load user, you may not have permissions</div>;
  }

  const handleSubmit = async (data: UserFormValues) => {
    await userUpdate({
      userId,
      data,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <UserFormElements handleSubmit={handleSubmit} user={data.user}>
        <UserFormElements.FieldRole />
        <UserFormElements.FieldEmailVerified />
        <UserFormElements.FieldEmail />
        <UserFormElements.FieldPhone />
        {/* <UserFormElements.FieldName /> */}
        <UserFormElements.FieldAvatar user={data.user} />
        <UserFormElements.SubmitButton
          isPending={isPendingComplexible}
          submitText="Save change"
        />
      </UserFormElements>
    </div>
  );
};
