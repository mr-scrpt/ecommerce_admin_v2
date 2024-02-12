import { RoutePathEnum } from "@/shared/config/routing.config";
import { CategoryCreate } from "@/widgets/categoryCreate";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const CategoryCreatePage: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl mb-2">Create new category</h1>
      </div>
      <CategoryCreate callbackUrl={RoutePathEnum.CATEGORIES} />
    </main>
  );
};

export default CategoryCreatePage;
