import { FC, HTMLAttributes } from "react";
import { Layout } from "./_ui/Layout";
import { Logo } from "./_ui/Logo";
import { ThemeToggler } from "@/features/Theme/_ui/ThemeToggler";
import { HeaderVariantType } from "./_type/props.type";
import { Nav } from "./_ui/nav";
import { Profile } from "./_ui/profile";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  variant: HeaderVariantType;
}

export const Header: FC<HeaderProps> = (props) => {
  const { variant } = props;
  const isShow = variant !== "auth";
  return (
    <Layout
      logo={<Logo />}
      nav={isShow && <Nav />}
      profile={isShow && <Profile />}
      actions={<ThemeToggler />}
    />
  );
};