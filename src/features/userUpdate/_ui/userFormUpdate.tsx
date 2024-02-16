import { useUserQuery } from "@/entities/user/_query/user.query";
import { UserForm, userFormSchema } from "@/entities/user/user";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useUserUpdate } from "../_vm/useUserUpdate";

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

  // data.user.role
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
      <UserForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        user={data.user}
        submitText={"Save change"}
      />
    </div>
  );
};
