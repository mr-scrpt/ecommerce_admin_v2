import { FC, HTMLAttributes } from "react";
import { Layout } from "./_ui/Layout";
import { Logo } from "./_ui/Logo";
import { Nav } from "./_ui/Nav";
import { Profile } from "./_ui/Profile";
import { ThemeToggler } from "@/features/Theme/_ui/ThemeToggler";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <Layout
      logo={<Logo />}
      nav={<Nav />}
      profile={<Profile />}
      actions={<ThemeToggler />}
    />
  );
};
