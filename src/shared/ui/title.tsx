import { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";
import { Paragraph } from "./paragraph";

interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const Title: FC<TitleProps> = (props) => {
  const { className, title, description, action } = props;
  return (
    <div className={cn(className, "flex w-full flex-wrap")}>
      <div className="flex w-full justify-between">
        <h2 className="mb-1 text-xl">{title}</h2>
        {action && action}
      </div>
      {description && <Paragraph className="w-full">{description}</Paragraph>}
    </div>
  );
};
