import { FC, HTMLAttributes } from "react";
import { InitUserData } from "./initUserData";

interface AppInitProps extends HTMLAttributes<HTMLDivElement> {}

export const AppInit: FC<AppInitProps> = async (props) => {
  const { children } = props;
  return (
    <>
      <InitUserData />
      {children}
    </>
  );
};
