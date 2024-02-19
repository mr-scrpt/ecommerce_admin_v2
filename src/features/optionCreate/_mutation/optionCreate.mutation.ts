import { useMutation } from "@tanstack/react-query";
import { optionCreateAction } from "../_action/optionCreate.action";

const baseKey = "optionCreateMutation";

interface IOptionCreateMutation {
  onSuccess: () => void;
}

export const useOptionCreateMutation = (props: IOptionCreateMutation) => {
  const { onSuccess } = props;
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: optionCreateAction,
    async onSuccess() {
      onSuccess();
    },
  });
  return {
    isPending,
    isSuccess,
    mutateAsync,
  };
};
