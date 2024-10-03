import { Header } from "@/widgets/header/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header isAuth={false} />
      {children}
    </>
  );
};
export default Layout;
