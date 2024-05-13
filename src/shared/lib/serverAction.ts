import { createStrictContext, useStrictContext } from "./react";

export type ServerActionType = Record<string, (...args: any[]) => any>;

export const serverActionContext = createStrictContext<ServerActionType>();

export const useGetServerAction = <T extends ServerActionType>() => {
  const context = useStrictContext<ServerActionType>(serverActionContext);

  return context as T;
};
