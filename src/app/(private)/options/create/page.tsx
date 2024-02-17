import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
// import { OptionCreate } from "@/widgets/optionCreate";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const OptionCreatePage: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <TitlePage title="Option create" description="Create option item" />

      {/* <OptionCreate callbackUrl={RoutePathEnum.optionS} /> */}
    </main>
  );
};

export default OptionCreatePage;
