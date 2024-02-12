import { CategoryTable } from "@/widgets/categoryTable";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageCategories: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <h1 className="text-3xl mb-2">Categories</h1>
      <CategoryTable />
    </main>
  );
};
export default PageCategories;
