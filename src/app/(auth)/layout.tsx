import { Header } from "@/widgets/header/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header variant="auth" />
      {children}
    </>
  );
};
export default Layout;
