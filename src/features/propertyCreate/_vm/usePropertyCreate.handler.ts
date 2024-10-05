import { useRouter } from "next/navigation";
import { PropertyCreateFormValues } from "../_domain/form.schema";
import { usePropertyCreateMutation } from "../_mutation/propertyCreate.mutation";
import { HandlerFormBaseProps } from "@/shared/lib/hook";

export const usePropertyCreateHandler = (props: HandlerFormBaseProps) => {
  const { onSuccess, callbackUrl } = props;

  const {
    propertyCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = usePropertyCreateMutation();

  const router = useRouter();

  const handlePropertyCreate = async (data: PropertyCreateFormValues) => {
    const { name, datatypeList, propertyItemList } = data;
    const [datatype] = datatypeList;

    await propertyCreate({
      propertyData: {
        name,
        datatype: datatype.type,
      },
      propertyItemData: propertyItemList.map(
        ({ value, propertyItemValue: label }) => ({
          name: label,
          value: value,
        }),
      ),
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return {
    handlePropertyCreate,
    isPendingCreate,
    isSuccessCreate,
  };
};
