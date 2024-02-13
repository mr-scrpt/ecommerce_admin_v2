import { RoutePathEnum } from "@/shared/config/routing.config";
import { CategoryUpdate } from "@/widgets/categoryUpdate";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  params: { slug: string };
}

const CategoryUpdatePage: FC<PageProps> = (props) => {
  const {
    params: { slug },
  } = props;
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl mb-2">Create new category</h1>
      </div>
      <CategoryUpdate callbackUrl={RoutePathEnum.CATEGORIES} slug={slug} />
    </main>
  );
};

export default CategoryUpdatePage;
