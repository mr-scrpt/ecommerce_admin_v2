import { moduleContext, serverActionContext } from "@/shared/lib/serverAction";
import { FC, HTMLAttributes } from "react";
import { initModule, loadModule } from "../module";
import { serviceExecutors } from "../action";
// import { categoryListService } from "@/entities/category/instanse";

interface ProviderModuleProps extends HTMLAttributes<HTMLDivElement> {}

export const ProviderModule: FC<ProviderModuleProps> = (props) => {
  const { children } = props;

  // const moduleContainer = loadModule();
  // initModule;
  serviceExecutors();
  return (
    <serverActionContext.Provider value={{}}>
      {children}
    </serverActionContext.Provider>
  );

  // return (
  //   <moduleContext.Provider value={moduleContainer}>
  //     {children}
  //   </moduleContext.Provider>
  // );
};
