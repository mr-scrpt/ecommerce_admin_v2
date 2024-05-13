import {
  ServerActionType,
  serverActionContext,
} from "@/shared/lib/serverAction";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { categoryListService } from "@/entities/category/instanse";
import { serviceExecutors } from "../action";

interface ProviderModuleProps extends HTMLAttributes<HTMLDivElement> {}

export const ProviderModule: FC<ProviderModuleProps> = (props) => {
  const { children } = props;

  return (
    <serverActionContext.Provider value={serviceExecutors}>
      {children}
    </serverActionContext.Provider>
  );
};
