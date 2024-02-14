import { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

interface TitlePageProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  action?: ReactNode;
}

export const TitlePage: FC<TitlePageProps> = (props) => {
  const { className, title, action } = props;
  return (
    <div className={cn(className, "flex w-full justify-between")}>
      <h1 className="mb-2 text-3xl">{title}</h1>
      {action && action}
    </div>
  );
};
