import { AuthorizedGuard } from "@/features/Auth/Authorized.guard";
import { Header } from "@/widgets/Header/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthorizedGuard>
        <Header variant="private" />
        {children}
      </AuthorizedGuard>
    </>
  );
};
export default Layout;
