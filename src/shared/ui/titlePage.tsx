import { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

interface TitlePageProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  action?: ReactNode;
}

export const TitlePage: FC<TitlePageProps> = (props) => {
  const { className, title, action } = props;
  return (
    <div className={cn(className, "flex justify-between w-full")}>
      <h1 className="text-3xl mb-2">{title}</h1>
      {action && action}
    </div>
  );
};
