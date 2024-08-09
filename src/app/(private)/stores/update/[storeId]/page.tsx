import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { StoreUpdate } from "@/widgets/storeUpdate";
import { FC } from "react";

interface PageProps {
  params: { storeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const StoreUpdatePage: FC<PageProps> = (props) => {
  const {
    params: { storeId },
  } = props;
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Categories update" description="Update store item" />
      <StoreUpdate callbackUrl={RoutePathEnum.STORES} storeId={storeId} />
    </main>
  );
};

export default StoreUpdatePage;
