import { FC, HTMLAttributes } from "react";
import { OrderRow } from "../_domain/orderRow.types";
import { OrderProductSnippet } from "./orderProductSnippet";

type changeQuantityProps = {
  productId: string;
  quantity: number;
  orderRowId: string;
};
interface OrderProductListProps extends HTMLAttributes<HTMLDivElement> {
  orderProductRowList: Array<OrderRow>;
  changeQuantity: (params: changeQuantityProps) => void;
}

export const OrderProductList: FC<OrderProductListProps> = (props) => {
  const { orderProductRowList, changeQuantity } = props;
  return (
    <div className="flex w-full flex-col gap-4">
      {orderProductRowList.map((orderRow) => (
        <div key={orderRow.id} className="flex w-full flex-row">
          <OrderProductSnippet
            orderRow={orderRow}
            applayChangeQuantity={(value) => {
              return changeQuantity({
                productId: orderRow.productId,
                orderRowId: orderRow.id,
                quantity: value,
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};
