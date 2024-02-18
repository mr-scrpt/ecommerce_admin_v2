import { OptionId } from "@/entities/option";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { OptionUpdate } from "@/widgets/optionUpdate";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  params: { optionId: OptionId };
}

const OptionUpdatePage: FC<PageProps> = (props) => {
  const {
    params: { optionId },
  } = props;
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Option update" description="Update option item" />
      <OptionUpdate callbackUrl={RoutePathEnum.OPTIONS} optionId={optionId} />
    </main>
  );
};

export default OptionUpdatePage;
