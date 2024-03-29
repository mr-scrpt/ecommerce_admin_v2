import { productSchema } from "@/entities/product";
import { getProductListAction } from "@/entities/product/server";
import { NextResponse } from "next/server";
import { z } from "zod";

// const resultSchema = z.object({
//   data: z.array(productSchema),
// });

export const GET = async (): Promise<NextResponse<any>> => {
  try {
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
