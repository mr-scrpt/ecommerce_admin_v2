"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { OrderRelation } from "../_domain/types";
import { OrderForm } from "./orderForm";

interface OrderFormLayoutProps extends HTMLAttributes<HTMLFormElement> {
  order: OrderRelation;
  handleSubmit?: (data: any) => void;
  isPending: boolean;
  submitText: string;
}

const ORDER_TAB_ACTVE = "order_tab_active";

export const OrderFormLayout: FC<OrderFormLayoutProps> = (props) => {
  const { submitText } = props;

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
            <div className="flex w-full border p-4">
              <OrderForm.OrderSelectStatus />
            </div>
            <div className="flex w-full border p-4">
              <OrderForm.OrderSelectPayment />
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
