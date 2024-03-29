"use server";
import { z } from "zod";
import { profileSchema } from "../_domain/profile.schema";
import { getProfileUseCase } from "../_useCase/getProfile.usecase";
import { getAppSessionStrictServer } from "../../../shared/session/getAppSessionServer";
import { Profile } from "../profile";

// const propsSchema = z.object({
//   userId: z.string(),
// });
//
// const resultSchema = z.object({
//   profile: profileSchema,
// });
//
// type ResultT = { profile: Profile };

export const getProfileAction = async (): Promise<any> => {
  try {
    return await fetch("https://ipapi.co/json/")
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
  } catch (e) {
    return e;
  }
};
