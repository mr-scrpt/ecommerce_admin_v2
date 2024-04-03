import { UserToCreate } from "@/entities/user/_domain/user.types";
import { UserFormElements } from "@/entities/user/user";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { UserCreateFormValues, userCreateFormSchema } from "../domain/schema";

interface UserFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
  onUserCreate: (user: UserCreateFormValues) => void;
  isPending: boolean;
}

export const UserFormCreate: FC<UserFormProps> = (props) => {
  const { className, onUserCreate, onSuccess, callbackUrl, isPending } = props;

  const handleSubmit = async (data: UserCreateFormValues) => {
    onUserCreate(data);

    onSuccess?.();

    // if (callbackUrl) {
    //   router.push(callbackUrl);
    // }
  };

  return (
    <div className={cn(className, "w-full")}>
      <UserFormElements
        handleSubmit={handleSubmit}
        schema={userCreateFormSchema}
      >
        <UserFormElements.FieldEmail />
        <UserFormElements.FieldName />
        <UserFormElements.FieldPhone />
        <UserFormElements.SubmitButton
          isPending={isPending}
          submitText="Create user"
        />
      </UserFormElements>
    </div>
  );
};
