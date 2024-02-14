import { UserEntity } from "@/entities/user/_domain/user.types";
import { useInvalidateUser } from "@/entities/user/user";
import { useUserRemoveMutation } from "../_mutation/removeUser.mutation";
import { useEmitUserRemove } from "./event/useEmitUserRemove";

export const useUserRemove = () => {
  // const invalidateUser = useInvalidateUser();
  const { userRemoveEvent } = useEmitUserRemove();

  const onSuccess = async (user: UserEntity) => {
    const { id } = user;
    // await invalidateUser(id);
    userRemoveEvent(id);
  };

  const { mutateAsync, isPending, isSuccess } = useUserRemoveMutation({
    onSuccess,
  });

  return {
    userRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
