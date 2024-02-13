import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
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
      <TitlePage title="Categories update" />
      <CategoryUpdate callbackUrl={RoutePathEnum.CATEGORIES} slug={slug} />
    </main>
  );
};

export default CategoryUpdatePage;
