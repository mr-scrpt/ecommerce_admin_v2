import { configPublic } from "@/shared/config/public.config";
import { cookies } from "next/headers";
import { clientNetworkData } from "./constant";
import { clientNetworkDataSchema } from "./schema";
import { ClientNetworkData } from "./types";

const { COOKIE_NETWORK_NAME } = configPublic;

export const getNetworkClientCookie = (): ClientNetworkData => {
  const c = cookies();
  const cookieValue = c.get(COOKIE_NETWORK_NAME)?.value;
  // const cookieValue = "";

  const clientData = cookieValue ? JSON.parse(cookieValue) : clientNetworkData;

  const clientDataParsed = clientNetworkDataSchema.parse(clientData);

  return clientDataParsed;
};
