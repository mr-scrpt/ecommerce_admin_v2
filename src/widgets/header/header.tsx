"use client";
import { ThemeToggler } from "@/features/theme/_ui/ThemeToggler";
import { FC, HTMLAttributes } from "react";
import { Layout } from "./_ui/layout";
import { Logo } from "./_ui/logo";
import { Nav } from "./_ui/nav";
import { ProfileMenu } from "./_ui/profileMenu";
import { AuthPresentation } from "@/features/Auth";
import { HeaderVariantEnum } from "./_type/props.type";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  variant: HeaderVariantEnum;
}

export const Header: FC<HeaderProps> = (props) => {
  const { variant } = props;
  return (
    <Layout
      logo={<Logo />}
      nav={<Nav />}
      profile={<ProfileMenu />}
      actions={<ThemeToggler />}
      login={<AuthPresentation.ButtonLogIn />}
      variant={variant}
    />
  );
};
