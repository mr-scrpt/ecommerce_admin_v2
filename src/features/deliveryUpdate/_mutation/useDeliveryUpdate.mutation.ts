import { useMutation } from "@tanstack/react-query";
import { Delivery } from "@/entities/delivery";
import { useEmitDeliveryUpdate } from "../_vm/event/useEmitDeliveryUpdate";
import { deliveryUpdateApi } from "../_api/orderDeliveryUpdate.api";

// const baseKey = "orderDeliveryUpdateMutation";

// interface IOrderDeliveryUpdateMutation {
//   onSuccess: (delivery: Delivery) => void;
// }

export const useDeliveryUpdateMutation = () =>
  // props: IOrderDeliveryUpdateMutation,
  {
    // const { onSuccess } = props;
    const { deliveryUpdateEvent } = useEmitDeliveryUpdate();

    const { mutateAsync, isPending } =
      deliveryUpdateApi.deliveryUpdate.update.useMutation({
        onSuccess: async ({ id }) => {
          deliveryUpdateEvent(id);
        },
      });
    return {
      mutateAsync,
      isPending,
    };
  };
