import { useOptionCreateMutation } from "../_mutation/optionCreate.mutation";
import { useEmitOptionCreate } from "./event/useEmitOptionCreate";

export const useOptionCreate = () => {
  const { optionCreateEvent } = useEmitOptionCreate();

  const onSuccess = async () => {
    optionCreateEvent();
  };

  const { mutateAsync, isPending, isSuccess } = useOptionCreateMutation({
    onSuccess,
  });

  return {
    optionCreate: mutateAsync,
    isPending,
    isSuccess,
  };
};
