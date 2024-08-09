import { TitlePage } from "@/shared/ui/titlePage";
import { ConsumerTable } from "@/widgets/userTable";
import { FC, HTMLAttributes } from "react";

const PageConsumers: FC = () => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Consumers" description="Manage store consumer list" />
      <ConsumerTable />
    </main>
  );
};
export default PageConsumers;
