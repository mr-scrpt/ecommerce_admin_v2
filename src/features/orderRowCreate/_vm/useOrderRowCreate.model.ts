"use client";
import { useOrderRowCreateMutation } from "../_mutation/useOrderRowCreate.mutation";

export const useOrderRowCreateModel = () => {
  const { orderRowCreate, isSuccess, isPending } = useOrderRowCreateMutation();

  // useEffect(() => {
  //   if (isSuccess) {
  //     notice({ title: "Success", description: "OrderRow has been created" });
  //   }
  //
  //   if (isError && error) {
  //     noticeError({ title: "Error", description: error.message });
  //   }
  // }, [isSuccess, isError, error]);

  return {
    orderRowCreate,
    isPending,
    isSuccess,
  };
};
