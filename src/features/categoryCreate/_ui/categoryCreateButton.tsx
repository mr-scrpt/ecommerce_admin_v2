import { RoutePathEnum } from "@/shared/config/routing.config";
import { Button } from "@/shared/ui/button";
import { Plus as IconPlus } from "lucide-react";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

interface CategoryCreateButtonProps extends HTMLAttributes<HTMLButtonElement> {
  route: RoutePathEnum;
}

export const CategoryCreateButton: FC<CategoryCreateButtonProps> = (props) => {
  const { route } = props;
  return (
    <Button size="icon" asChild>
      <Link href={route}>
        <IconPlus />
      </Link>
    </Button>
  );
};
