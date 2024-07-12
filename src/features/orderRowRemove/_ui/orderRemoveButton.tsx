import { Button } from "@/shared/ui/button";
import { FC, HTMLAttributes } from "react";
import { useOrderRowRemoveConfirmModel } from "../_vm/useOrderRowRemoveConfirm.model";
import { OrderRow } from "@/kernel/domain/order/orderRow.type";

interface OrderRemoveButtonProps extends HTMLAttributes<HTMLDivElement> {
  orderRow: OrderRow;
}

export const OrderRemoveButton: FC<OrderRemoveButtonProps> = (props) => {
  const { orderRow } = props;
  const { removeOrderConfirm, isPending, isSuccess } =
    useOrderRowRemoveConfirmModel();

  return (
    <Button
      disabled={isPending || isSuccess}
      onClick={() => {
        removeOrderConfirm(orderRow.id);
      }}
    >
      Remove
    </Button>
  );
};
