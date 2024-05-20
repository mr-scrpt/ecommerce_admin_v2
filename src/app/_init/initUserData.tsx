"use client";
import { useAppSession } from "@/kernel/lib/nextauth";
import {
  COOKIE_NETWORK_MAX_AGE,
  COOKIE_NETWORK_NAME,
} from "@/shared/session/constant";
import { ClientNetworkData } from "@/shared/session/types";
import { getCookie, setCookie } from "cookies-next";
import { FC, HTMLAttributes, useEffect } from "react";

interface InitUserDataProps extends HTMLAttributes<HTMLDivElement> {}

export const InitUserData: FC<InitUserDataProps> = (props) => {
  const { children } = props;
  const session = useAppSession();
  const cookieUserInfo = getCookie(COOKIE_NETWORK_NAME);

  const requestData = async () => {
    const data = await fetch("https://ipapi.co/json/");
    const dataJson: ClientNetworkData = await data.json();
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
