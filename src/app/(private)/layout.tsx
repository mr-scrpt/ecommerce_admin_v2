import { AuthorizedGuard } from "@/features/Auth/Authorized.guard";
import { HeaderVariantEnum } from "@/widgets/header/_type/props.type";
import { Header } from "@/widgets/header/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthorizedGuard>
        <Header variant={HeaderVariantEnum.PRIVATE} />
        {children}
      </AuthorizedGuard>
    </>
  );
};
export default Layout;
