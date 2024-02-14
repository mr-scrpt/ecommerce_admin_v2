import { FC, HTMLAttributes, memo } from "react";

interface ParagraphProps extends HTMLAttributes<HTMLDivElement> {}

export const Paragraph: FC<ParagraphProps> = (props) => {
  const { children } = props;
  return <p className="text-sm text-muted-foreground">{children}</p>;
};
