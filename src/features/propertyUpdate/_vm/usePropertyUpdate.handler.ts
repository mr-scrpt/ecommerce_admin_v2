import { useRouter } from "next/navigation";
import { PropertyUpdateFormValues } from "../_domain/form.schema";
import { usePropertyUpdateMutation } from "../_mutation/usePropertyUpdate.mutation";
import { HandlerFormBaseProps } from "@/shared/lib/hook";

export interface PropertyUpdateHandlerProps extends HandlerFormBaseProps {
  data: {
    propertyId: string;
  };
}

export const usePropertyUpdateHandler = (props: PropertyUpdateHandlerProps) => {
  const { onSuccess, callbackUrl, data } = props;
  const { propertyId } = data;

  const {
    propertyUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = usePropertyUpdateMutation();

  const router = useRouter();

  const handlePropertyUpdate = async (data: PropertyUpdateFormValues) => {
    const { name, datatypeList, propertyItemList } = data;
    const [datatype] = datatypeList;

    const formData = {
      selector: { id: propertyId },

      propertyData: {
        name,
        datatype: datatype.type,
      },
      propertyItemListData: propertyItemList.map((item) => ({
        value: item.propertyItemValue,
        name: item.propertyItemName,
        propertyId: propertyId,
        id: item.value,
      })),
    };

    await propertyUpdate(formData);

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return {
    handlePropertyUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  };
};
