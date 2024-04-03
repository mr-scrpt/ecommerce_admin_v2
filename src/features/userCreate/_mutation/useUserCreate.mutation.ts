import { useMutation } from "@tanstack/react-query";
import { createUserAction } from "../_action/userCreate.action";
import { User } from "@/entities/user/user";
import { useEmitUserUpdate } from "../_vm/event/useEmitUserUpdate";

const baseKey = "userCreateMutation";

// interface IUserCreateMutation {
//   onSuccess: (user: User) => void;
// }
export const useUserCreateMutation = () => {
  // const { onSuccess } = props;
  const { userUpdateEvent } = useEmitUserUpdate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: createUserAction,
    onSuccess: async ({ user }) => {
      userUpdateEvent(user.id);
    },
  });
  return {
    createUser: mutateAsync,
    isPending,
  };
};
