import { ToCategoryCreateButton } from "@/features/categoryCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { CategoryTable } from "@/widgets/categoryTable";
import { FC, HTMLAttributes } from "react";

const PageCategories: FC = () => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage
        title="Categories"
        description="Manage your category list"
        action={
          <ToCategoryCreateButton route={RoutePathEnum.CATEGORY_CREATE} />
        }
      />
      <CategoryTable />
    </main>
  );
};
export default PageCategories;
