"use client";
import { FC, HTMLAttributes } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { children } = props;
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
};
