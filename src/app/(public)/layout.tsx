import { Header } from "@/widgets/Header/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header variant="public" />
      {children}
    </>
  );
};
export default Layout;
