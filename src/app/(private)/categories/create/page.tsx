import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { CategoryCreate } from "@/widgets/categoryCreate";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const CategoryCreatePage: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <TitlePage title="Categories create" />

      <CategoryCreate callbackUrl={RoutePathEnum.CATEGORIES} />
    </main>
  );
};

export default CategoryCreatePage;
