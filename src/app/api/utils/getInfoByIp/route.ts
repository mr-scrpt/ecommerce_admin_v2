import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse<any>> => {
  try {
    console.log("output_log:  =>>> in getInfoByIp/route");
    const data = await fetch("https://ipapi.co/json/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return {
          ip: data.ip,
          country: data.country,
          countryName: data.country_name,
          countryCode: data.country_calling_code,
          city: data.city,
          timezone: data.timezone,
        };
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(e);
  }
};
