import { Button } from "@/shared/ui/button";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageSettings: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <h1 className="text-3xl mb-2">Settings</h1>
      {/*TODO Featur*/}
      <Button>Remove all unused img</Button>
    </main>
  );
};
export default PageSettings;
