import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageProducts: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <h1 className="mb-2 text-3xl">Products</h1>
    </main>
  );
};
export default PageProducts;
