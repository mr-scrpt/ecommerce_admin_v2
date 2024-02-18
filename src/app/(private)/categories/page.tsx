import { CategoryCreateButton } from "@/features/categoryCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { CategoryTable } from "@/widgets/categoryTable";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageCategories: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage
        title="Categories"
        description="Manage your category list"
        action={<CategoryCreateButton route={RoutePathEnum.CATEGORY_CREATE} />}
      />
      <CategoryTable />
    </main>
  );
};
export default PageCategories;
