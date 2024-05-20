import { Container, interfaces } from "inversify";
import { createStrictContext, useStrictContext } from "./react";

// export type ServerActionType = Record<string, (...args: any[]) => any>;
export type ServerActionType = Record<string, (...args: any[]) => Promise<any>>;

export const serverActionContext = createStrictContext<ServerActionType>();

export const useGetServerAction = <T extends ServerActionType>() => {
  const context = useStrictContext<ServerActionType>(serverActionContext);

  return context as T;
};

export const moduleContext = createStrictContext<interfaces.Container>();

export const useModule = <T extends interfaces.Container>() => {
  const context = useStrictContext<interfaces.Container>(moduleContext);

  return context as T;
};
