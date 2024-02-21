import { OptionEntity } from "@/entities/option";
import { useOptionUpdateMutation } from "../_mutation/useOptionUpdate.mutation";
import { useEmitOptionUpdate } from "./event/useEmitOptionUpdate";

export const useOptionUpdate = () => {
  const { optionUpdateEvent } = useEmitOptionUpdate();

  const onSuccess = async (option: OptionEntity) => {
    const { id } = option;
    optionUpdateEvent(id);
  };

  const { mutateAsync, isPending } = useOptionUpdateMutation({ onSuccess });

  return {
    optionUpdate: mutateAsync,
    isPending,
  };
};
