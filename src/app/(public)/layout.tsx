import { Header } from "@/widgets/Header/Header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header variant="public" />
      {children}
    </>
  );
};
export default Layout;
