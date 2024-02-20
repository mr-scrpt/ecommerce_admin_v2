import {
  OptionEntity,
  OptionRelationEntity,
} from "@/entities/option/_domain/option/types";
import { useMutation } from "@tanstack/react-query";
import { updateOptionAction } from "../_action/optionUpdate.action";

const baseKey = "optionUpdateMutation";

interface IOptionUpdateMutation {
  onSuccess: (option: OptionEntity) => void;
}
export const useOptionUpdateMutation = (props: IOptionUpdateMutation) => {
  const { onSuccess } = props;

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateOptionAction,
    // async onSuccess({ option }, { optionId }) {
    //   onSuccess(option, optionId);
    // },
    async onSuccess({ option }) {
      onSuccess(option);
    },
  });
  return {
    mutateAsync,
    isPending,
  };
};
