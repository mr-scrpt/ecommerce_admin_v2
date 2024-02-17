// "use client";
import { OptionEntity } from "@/entities/option";
import { useOptionUpdateMutation } from "../_mutation/useOptionUpdate.mutation";
import { useEmitOptionUpdate } from "./event/useEmitOptionUpdate";

export const useOptionUpdate = () => {
  // const { update: updateSession } = useAppSession();

  const { optionUpdateEvent } = useEmitOptionUpdate();

  const onSuccess = async (option: OptionEntity) => {
    const { id } = option;
    console.log("output_log: revalidate option id =>>>", id);
    // await invalidateOption(id);
    // await updateSession({
    //   option,
    // });
    optionUpdateEvent(id);
  };

  const { mutateAsync, isPending } = useOptionUpdateMutation({ onSuccess });

  return {
    // optionUpdateEvent,
    optionUpdate: mutateAsync,
    isPending,
  };
};
