import { UserId, useInvalidateUser } from "@/entities/user/user";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useUserRemoveTableListMutation } from "../_mutation/removeUserTableList.mutation";

export const useUserRemoveConfirm = () => {
  const getConfirmation = useGetConfirmation();

  const { isPending, isSuccess, mutateAsync } =
    useUserRemoveTableListMutation();

  // const invalidateUser = useInvalidateUser();

  const removeUserConfirm = async (userId: UserId) => {
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a user? This action cannot be canceled",
    });

    if (!confirmation) return;

    // const onSuccess = async (user: User, userId: UserId) => {
    //   await invalidateUser(userId);
    //   await updateSession({
    //     user: user,
    //   });
    //   userUpdateEvent(userId);
    // };

    await mutateAsync(userId);
  };

  return { isPending, isSuccess, removeUserConfirm };
};
