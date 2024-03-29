"use client";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useAppSession } from "@/shared/session";
import { ClientNetworkData } from "@/shared/session/types";

interface InitUserDataProps extends HTMLAttributes<HTMLDivElement> {}

export const InitUserData: FC<InitUserDataProps> = (props) => {
  const [userData, setUserData] = useState<ClientNetworkData>();
  const session = useAppSession();

  useEffect(() => {
    const requestData = async () => {
      if (!userData) {
        const data = await fetch("https://ipapi.co/json/");
        const dataJson: ClientNetworkData = await data.json();

        setUserData(dataJson);
        setCookie("userClientData", JSON.stringify(dataJson));
      }
      // console.log("output_log:  =>>>", dataJson);
      // setUserData(dataJson);
      // const mokData: ClientNetworkData = {
      //   ip: "127.0.0.1",
      //   country: "US",
      //   countryName: "United States",
      //   countryCode: "US",
      //   city: "New York",
      //   timezone: "America/New_York",
      // };
      // console.log("output_log:  =>>>", getCookie("userClientData"));
    };
    requestData();
  }, []);
  // const data = await fetch("https://ipapi.co/json/");
  // const dataJson = await data.json();
  // // console.log("output_log: data  =>>>", {
  // //   ip: dataJson.ip,
  // //   country: dataJson.country,
  // //   countryName: dataJson.country_name,
  // //   countryCode: dataJson.country_calling_code,
  // //   city: dataJson.city,
  // //   timezone: dataJson.timezone,
  // // });
  // setCookie("ip", dataJson.ip);

  return <div>InitUserData</div>;
};
