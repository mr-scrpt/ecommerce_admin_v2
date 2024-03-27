import { FC, HTMLAttributes } from "react";
import { OrderStatusFormElements } from "./orderStatusFormElements";
import { OrderStatusFormValues } from "../../_domain/order.schema";
import { OrderStatusGroup } from "../../_domain/order.types";

interface OrderStatusFormProps extends HTMLAttributes<HTMLFormElement> {
  orderStatus: OrderStatusGroup;
  handleSubmit: (data: OrderStatusFormValues) => void;
  submitText: string;
}

export const OrderStatusForm: FC<OrderStatusFormProps> = (props) => {
  const { submitText } = props;
  return (
    <OrderStatusFormElements {...props}>
      <div className="flex w-full gap-4">
        <OrderStatusFormElements.SelectStatus className="grow" />
        <OrderStatusFormElements.SelectPayment className="grow" />
      </div>
      <OrderStatusFormElements.SubmitButton
        isPending={false}
        submitText={submitText}
      />
    </OrderStatusFormElements>
  );
};
