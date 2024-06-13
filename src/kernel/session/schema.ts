import { z } from "zod";

export const clientNetworkDataSchema = z.object({
  ip: z.string(),
  country: z.string(),
  country_name: z.string(),
  country_code: z.string(),
  city: z.string(),
  timezone: z.string(),
});
