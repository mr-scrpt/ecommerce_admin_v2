import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { CategoryCreate } from "@/widgets/categoryCreate";
import { FC } from "react";

const CategoryCreatePage: FC = () => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Categories create" description="Create category item" />

      <CategoryCreate callbackUrl={RoutePathEnum.CATEGORIES} />
    </main>
  );
};

export default CategoryCreatePage;
