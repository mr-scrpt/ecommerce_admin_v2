import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { FC, HTMLAttributes, useEffect, useState } from "react";

interface OrderUpdateLayoutProps extends HTMLAttributes<HTMLDivElement> {
  slotGeneral?: JSX.Element;
  slotDelivery?: JSX.Element;
  slotConsumer?: JSX.Element;
}

const ORDER_TAB_ACTVE = "order_tab_active";

export const OrderUpdateLayout: FC<OrderUpdateLayoutProps> = (props) => {
  const { slotGeneral, slotDelivery, slotConsumer } = props;
  const [activeTab, setActiveTab] = useState("general");

  const onSelect = (value: string) => {
    localStorage.setItem(ORDER_TAB_ACTVE, value);
  };

  useEffect(() => {
    const tabActive = localStorage.getItem(ORDER_TAB_ACTVE);
    if (tabActive) {
      setActiveTab(tabActive);
    }
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex w-full justify-between">
          <TabsList>
            <TabsTrigger onClick={() => onSelect("general")} value="general">
              General
            </TabsTrigger>
            <TabsTrigger onClick={() => onSelect("delivery")} value="delivery">
              Delivery
            </TabsTrigger>
            <TabsTrigger onClick={() => onSelect("consumer")} value="consumer">
              Consumer
            </TabsTrigger>
          </TabsList>
          {/* <ProductForm.SubmitButton */}
          {/*   className="align-self-end" */}
          {/*   submitText={submitText} */}
          {/* /> */}
        </div>
        {slotGeneral && (
          <TabsContent value="general" className="flex w-full flex-col gap-4">
            {slotGeneral}
          </TabsContent>
        )}
        {slotDelivery && (
          <TabsContent value="delivery" className="flex w-full flex-col gap-4">
            {slotDelivery}
          </TabsContent>
        )}

        {slotConsumer && (
          <TabsContent value="consumer" className="flex w-full flex-col gap-4">
            {slotConsumer}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
