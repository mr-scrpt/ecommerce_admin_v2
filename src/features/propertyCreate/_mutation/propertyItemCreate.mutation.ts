import { useMutation } from "@tanstack/react-query";
import { propertyCreateAction } from "../_action/propertyCreate.action";

const baseKey = "propertyCreateMutation";

interface IPropertyCreateMutation {
  onSuccess: () => void;
}

export const usePropertyCreateMutation = (props: IPropertyCreateMutation) => {
  const { onSuccess } = props;
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: propertyCreateAction,
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
