import { FC, HTMLAttributes } from "react";
import { Layout } from "./_ui/layout";
import { Logo } from "./_ui/logo";
import { Nav } from "./_ui/nav";
import { Profile } from "./_ui/profile";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Header: FC<HeaderProps> = (props) => {
  return <Layout logo={<Logo />} nav={<Nav />} profile={<Profile />} />;
};
