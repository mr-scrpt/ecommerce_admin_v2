"use client";
import { useAppSession } from "@/kernel/lib/nextauth";
import { ClientNetworkData } from "@/kernel/session/_domain/types";
import { getCookie, setCookie } from "cookies-next";
import { FC, HTMLAttributes, useEffect } from "react";
import { configPublic } from "@/shared/config/public.config";

interface InitUserDataProps extends HTMLAttributes<HTMLDivElement> {}

const { COOKIE_NETWORK_NAME, COOKIE_NETWORK_MAX_AGE } = configPublic;

export const InitUserData: FC<InitUserDataProps> = (props) => {
  const { children } = props;
  const session = useAppSession();
  const cookieUserInfo = getCookie(COOKIE_NETWORK_NAME);

  const requestData = async () => {
    const data = await fetch("https://ipapi.co/json/");
    const dataJson: ClientNetworkData = await data.json();
    if (!dataJson) {
      return;
    }
    setCookie(COOKIE_NETWORK_NAME, JSON.stringify(dataJson), {
      maxAge: COOKIE_NETWORK_MAX_AGE,
    });
  };

  useEffect(() => {
    if (cookieUserInfo) {
      try {
        const cookieParsed = JSON.parse(cookieUserInfo) as ClientNetworkData;
        const { ip } = cookieParsed;
        if (!ip) {
          requestData();
        }
      } catch (error) {
        console.error("Error parsing cookie data:", error);
      }
    } else {
      requestData();
    }
  }, [cookieUserInfo, session]);
  return <>{children}</>;
};
