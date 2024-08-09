import { Button } from "@/shared/ui/button";
import { FC } from "react";

const PageSettings: FC = () => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <h1 className="mb-2 text-3xl">Settings</h1>
      {/* TODO: Feature */}
      <Button>Remove all unused img</Button>
    </main>
  );
};
export default PageSettings;
