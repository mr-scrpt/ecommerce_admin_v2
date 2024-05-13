import { serverActionContext } from "@/shared/lib/serverAction";
import { FC, HTMLAttributes } from "react";
import { getCategoryList } from "../action";

interface ProviderModuleProps extends HTMLAttributes<HTMLDivElement> {}

export const ProviderModule: FC<ProviderModuleProps> = (props) => {
  const { children } = props;

  const initModule = {
    getCategoryList,
  };

  return (
    <serverActionContext.Provider value={initModule}>
      {children}
    </serverActionContext.Provider>
  );
  // return (
  //   <ModuleContext.Provider value={{ getCategoryList }}>
  //     {children}
  //   </ModuleContext.Provider>
  // );
};
