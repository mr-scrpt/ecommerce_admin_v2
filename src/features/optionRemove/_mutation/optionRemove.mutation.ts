import { OptionEntity } from "@/entities/option/_domain/option/types";
import { useMutation } from "@tanstack/react-query";
import { removeOptionComplexibleAction } from "../_action/optionRemoveComplexible.action";

const baseKey = "optionRemoveMutation";

interface IOptionRemoveMutation {
  onSuccess: (option: OptionEntity) => void;
}

export const useOptionRemoveMutation = (props: IOptionRemoveMutation) => {
  const { onSuccess } = props;
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey, "complexible"],
    mutationFn: removeOptionComplexibleAction,
    async onSuccess({ option }) {
      onSuccess(option);
    },
  });
  return {
    isPending,
    isSuccess,
    mutateAsync,
  };
};
