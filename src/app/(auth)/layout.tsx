import { HeaderVariantEnum } from "@/widgets/header/_type/props.type";
import { Header } from "@/widgets/header/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header variant={HeaderVariantEnum.AUTH} />
      {children}
    </>
  );
};
export default Layout;
