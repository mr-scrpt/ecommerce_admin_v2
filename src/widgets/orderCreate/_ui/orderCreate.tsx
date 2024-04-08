"use client";
import { OrderProductAdd, OrderRowCreate } from "@/features/orderRowAdd";
import { OrderSelectOwner } from "@/features/orderSelectOwner";
import { UserFormCreate } from "@/features/userCreate";
import { useUserCreateMutation } from "@/features/userCreate";
import { UserCreate } from "@/features/userCreate/_domain/types";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes, useState } from "react";

interface OrderUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
}

export const OrderCreate: FC<OrderUpdateProps> = (props) => {
  const { callbackUrl } = props;

  const { createUser } = useUserCreateMutation();

  const [productList, setProductList] = useState<Array<OrderProductAdd>>([]);

  const handleRowCreate = (product: OrderProductAdd) => {
    setProductList([...productList, product]);
  };

  const productlIdList = productList.map((product) => product.productId);

  return (
    <div className="flex w-full flex-col gap-4">
      <UserFormCreate
        onUserCreate={(user: UserCreate) => {
          createUser({ data: user });
        }}
        isPending={false}
      />
      <OrderSelectOwner onSelectOwner={console.log} />
      <OrderRowCreate
        productIdList={productlIdList}
        handleRowCreate={handleRowCreate}
      />
      {/* <OrderRowList */}
      {/*   orderId={orderId} */}
      {/*   orderRowUpdateQuantity={orderRowUpdateQuantity} */}
      {/*   orderRowRemove={removeOrderConfirm} */}
      {/*   className="flex w-full border p-4" */}
      {/* /> */}
    </div>
  );
};
