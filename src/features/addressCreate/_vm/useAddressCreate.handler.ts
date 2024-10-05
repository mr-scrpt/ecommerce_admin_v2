import { useRouter } from "next/navigation";
import { AddressCreateFormValues } from "../_domain/form.schema";
import { useAddressCreateMutation } from "../_mutation/useAddressCreate.mutation";
import { HandlerFormBaseProps } from "@/shared/lib/hook";

interface AddressFormCreateProps extends HandlerFormBaseProps {
  data: {
    userId: string;
    settlementRef: string;
  };
}

export const useAddressCreateHandler = (props: AddressFormCreateProps) => {
  const { data, onSuccess, callbackUrl } = props;
  const { userId, settlementRef } = data;
  const {
    addressCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useAddressCreateMutation();

  const router = useRouter();

  const handleAddressCreate = async (data: AddressCreateFormValues) => {
    await addressCreate({
      addressData: {
        ...data,
        userId,
        settlementRef,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return {
    handleAddressCreate,
    isPendingCreate,
    isSuccessCreate,
  };
};
