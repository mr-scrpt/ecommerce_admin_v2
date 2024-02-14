import { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";
import { Paragraph } from "./paragraph";

interface TitlePageProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const TitlePage: FC<TitlePageProps> = (props) => {
  const { className, title, description, action } = props;
  return (
    <div className={cn(className, "flex w-full flex-wrap")}>
      <div className="flex w-full justify-between">
        <h1 className="mb-2 text-3xl">{title}</h1>
        {action && action}
      </div>
      {description && <Paragraph className="w-full">{description}</Paragraph>}
    </div>
  );
};
