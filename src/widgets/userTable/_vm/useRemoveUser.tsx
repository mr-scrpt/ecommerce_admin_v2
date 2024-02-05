import { UserId } from "@/entities/user/user";
import { useUserRemoveQuery } from "@/features/userRemove";
import { useGetConfirmation } from "@/shared/lib/confirmation";
// import { BoardPartial, useBoards } from "@/entities/board";

export const useRemoveUser = () => {
  const getConfirmation = useGetConfirmation();

  // const { removeBoard } = useBoards();
  const { isPending, mutate } = useUserRemoveQuery();

  const removeUser = async (userId: UserId) => {
    console.log("output_log: isUser id =>>>", userId);
    const confirmation = await getConfirmation({
      description:
        "Do you really want to remove a user? This action cannot be canceled",
    });

    if (!confirmation) return;

    mutate(userId);

    // removeBoard(board.id);
  };

  return { isPending, removeUser };
};
