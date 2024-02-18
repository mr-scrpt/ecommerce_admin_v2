import { CategoryId } from "@/entities/category";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { CategoryUpdate } from "@/widgets/categoryUpdate";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  params: { categoryId: CategoryId };
}

const CategoryUpdatePage: FC<PageProps> = (props) => {
  const {
    params: { categoryId },
  } = props;
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Categories update" description="Update category item" />
      <CategoryUpdate
        callbackUrl={RoutePathEnum.CATEGORIES}
        categoryId={categoryId}
      />
    </main>
  );
};

export default CategoryUpdatePage;
