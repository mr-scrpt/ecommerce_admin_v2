import { UserToCreate } from "@/entities/user/_domain/user.types";
import { UserFormElements, userFormSchema } from "@/entities/user/user";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";

interface UserFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
  onUserCreate: (user: UserToCreate) => void;
  isPending: boolean;
}

type UserFormValues = z.infer<typeof userFormSchema>;

export const UserFormCreate: FC<UserFormProps> = (props) => {
  const { className, onUserCreate, onSuccess, callbackUrl, isPending } = props;

  const handleSubmit = async (data: UserFormValues) => {
    onUserCreate(data);

    onSuccess?.();

    // if (callbackUrl) {
    //   router.push(callbackUrl);
    // }
  };

  return (
    <div className={cn(className, "w-full")}>
      {/* <UserForm */}
      {/*   handleSubmit={handleSubmit} */}
      {/*   isPending={isPending} */}
      {/*   submitText={"Create ORder"} */}
      {/*   avatarField={false} */}
      {/* /> */}
      <UserFormElements
        handleSubmit={handleSubmit}
        isPending={isPending}
        submitText={"Create User"}
        avatarField={false}
      >
        <UserFormElements.FieldRole />
        <UserFormElements.SubmitButton submitText="Create user" />
      </UserFormElements>
    </div>
  );
};
