import { CategoryCreateButton } from "@/features/categoryCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { CategoryTable } from "@/widgets/categoryTable";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageCategories: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl mb-2">Categories</h1>
        <CategoryCreateButton route={RoutePathEnum.CATEGORY_CREATE} />
      </div>
      <CategoryTable />
    </main>
  );
};
export default PageCategories;
