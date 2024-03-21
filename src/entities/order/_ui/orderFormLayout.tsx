"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { OrderRelation } from "../_domain/types";
import { OrderForm } from "./orderFromProduct/orderForm";
import { OrderProductList } from "..";

interface OrderFormLayoutProps extends HTMLAttributes<HTMLFormElement> {
  order: OrderRelation;
  // ProductListComp: FC<{ productListId: Array<string> }>;
  handleSubmit?: (data: any) => void;
  isPending: boolean;
  submitText: string;
}

const ORDER_TAB_ACTVE = "order_tab_active";

export const OrderFormLayout: FC<OrderFormLayoutProps> = (props) => {
  const { submitText, order } = props;

  const onSelect = (value: string) => {
    localStorage.setItem(ORDER_TAB_ACTVE, value);
  };

  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const tabActive = localStorage.getItem(ORDER_TAB_ACTVE);
    if (tabActive) {
      setActiveTab(tabActive);
    }
  }, []);

  console.log("output_log: order =>>>", order);

  return (
    <OrderForm {...props}>
      <div className="flex w-full flex-col gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex w-full justify-between">
            <TabsList>
              <TabsTrigger onClick={() => onSelect("general")} value="general">
                General
              </TabsTrigger>
              <TabsTrigger onClick={() => onSelect("contact")} value="property">
                Contact Information
              </TabsTrigger>
            </TabsList>
            <OrderForm.SubmitButton
              className="align-self-end"
              submitText={submitText}
            />
          </div>
          <TabsContent value="general" className="flex w-full flex-col gap-4">
            <div className="flex w-full gap-8 border p-4">
              {/* <OrderForm.OrderSelectStatus /> */}
              {/* <OrderForm.OrderSelectPayment /> */}
            </div>
            <div className="flex w-full border p-4">
              {/* {order && */}
              {/*   order.orderRowList && */}
              {/*   order.orderRowList.map((item) => ( */}
              {/*     <div key={item.id}>{item.id}</div> */}
              {/*   ))} */}
              <OrderProductList
                orderProductRowList={order.orderRowList}
                // ProductListComp={ProductListComp}
              />
            </div>
          </TabsContent>
          <TabsContent value="contact" className="flex w-full flex-col gap-4">
            <div className="flex w-full border p-4"></div>
          </TabsContent>
        </Tabs>
      </div>
    </OrderForm>
  );
};
