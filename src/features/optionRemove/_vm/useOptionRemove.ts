import { OptionEntity } from "@/entities/option";
import { useOptionRemoveMutation } from "../_mutation/optionRemove.mutation";
import { useEmitOptionRemove } from "./event/useEmitOptionRemove";

export const useOptionRemove = () => {
  const { optionRemoveEvent } = useEmitOptionRemove();

  const onSuccess = async (option: OptionEntity) => {
    const { id } = option;
    optionRemoveEvent(id);
  };

  const { mutateAsync, isPending, isSuccess } = useOptionRemoveMutation({
    onSuccess,
  });

  return {
    optionRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
