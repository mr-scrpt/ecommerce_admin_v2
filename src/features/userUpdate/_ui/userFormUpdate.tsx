import { UserFormElements, useUserQuery } from "@/entities/user";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { useUserUpdateModel } from "../_vm/useUserUpdate.model";
import {
  UserUpdateFormValues,
  userUpdateFormSchema,
} from "../_domain/form.schema";

interface UserFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const UserFormUpdate: FC<UserFormProps> = (props) => {
  const { userId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingUser,
    isFetchedAfterMount,
    user,
  } = useUserQuery(userId);

  const router = useRouter();

  const { userUpdate, isPending: isPendingUpdate } = useUserUpdateModel();

  const isPendingComplexible =
    isPendingUpdate || isPendingUser || !isFetchedAfterMount;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!user) {
    return <div>Failed to load user, you may not have permissions</div>;
  }

  const handleSubmit = async (userData: UserUpdateFormValues) => {
    // const {} = data.
    await userUpdate({
      selector: { id: userId },
      userData,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <UserFormElements
        handleSubmit={handleSubmit}
        user={user}
        schema={userUpdateFormSchema}
      >
        <UserFormElements.FieldRole />
        <UserFormElements.FieldEmailVerified />
        <UserFormElements.FieldEmail />
        <UserFormElements.FieldName />
        <UserFormElements.FieldPhone />
        {/* <UserFormElements.FieldAvatar user={data.user} /> */}
        <UserFormElements.SubmitButton
          isPending={isPendingComplexible}
          submitText="Save change"
        />
      </UserFormElements>
    </div>
  );
};
