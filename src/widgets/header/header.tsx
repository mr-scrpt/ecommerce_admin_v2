import { FC, HTMLAttributes } from "react";
import { Layout } from "./_ui/Layout";
import { Logo } from "./_ui/Logo";
import { Nav } from "./_ui/Nav";
import { Profile } from "./_ui/Profile";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Header: FC<HeaderProps> = (props) => {
  return <Layout logo={<Logo />} nav={<Nav />} profile={<Profile />} />;
};
