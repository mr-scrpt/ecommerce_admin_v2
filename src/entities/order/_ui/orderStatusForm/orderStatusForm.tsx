import { FC, HTMLAttributes } from "react";
import { OrderStatusFormElements } from "./orderStatusFormElements";
import { OrderStatusGroup } from "../../_domain/order.types";
import { cn } from "@/shared/ui/utils";
import { OrderStatusFormValues } from "../../_domain/form.schema";

interface OrderStatusFormProps extends HTMLAttributes<HTMLFormElement> {
  orderStatus: OrderStatusGroup;
  handleSubmit: (data: OrderStatusFormValues) => void;
  submitText: string;
}

export const OrderStatusForm: FC<OrderStatusFormProps> = (props) => {
  const { submitText, className } = props;
  return (
    <OrderStatusFormElements
      {...props}
      className={cn("flex w-full gap-4", className)}
    >
      <div className="flex w-full grow gap-4">
        <OrderStatusFormElements.SelectStatus className="grow" />
        <OrderStatusFormElements.SelectPayment className="grow" />
      </div>

      <div className="flex gap-4">
        <OrderStatusFormElements.SubmitButton
          isPending={false}
          submitText={submitText}
          className="mb-0 mt-auto"
        />
      </div>
    </OrderStatusFormElements>
  );
};
