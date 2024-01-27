import { Header } from "@/widgets/Header/Header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header variant="auth" />
      {children}
    </>
  );
};
export default Layout;
