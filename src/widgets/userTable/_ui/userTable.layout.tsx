"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { FC, HTMLAttributes, useEffect, useState } from "react";

interface UserTableLayoutProps extends HTMLAttributes<HTMLDivElement> {
  slotConsumer?: JSX.Element;
  slotStaff?: JSX.Element;
}

const USER_TAB_ACTVE = "user_tab_active";

export const UserTableLayout: FC<UserTableLayoutProps> = (props) => {
  const { slotConsumer, slotStaff } = props;
  const [activeTab, setActiveTab] = useState("consumer");

  const onSelect = (value: string) => {
    localStorage.setItem(USER_TAB_ACTVE, value);
  };

  useEffect(() => {
    const tabActive = localStorage.getItem(USER_TAB_ACTVE);
    if (tabActive) {
      setActiveTab(tabActive);
    }
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex w-full justify-between">
          <TabsList>
            <TabsTrigger onClick={() => onSelect("consumer")} value="consumer">
              Consumer
            </TabsTrigger>
            <TabsTrigger onClick={() => onSelect("staff")} value="staff">
              Staff
            </TabsTrigger>
          </TabsList>
        </div>
        {slotConsumer && (
          <TabsContent value="consumer" className="flex w-full flex-col gap-4">
            {slotConsumer}
          </TabsContent>
        )}
        {slotStaff && (
          <TabsContent value="staff" className="flex w-full flex-col gap-4">
            {slotStaff}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
