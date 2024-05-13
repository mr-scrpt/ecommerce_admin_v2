import { cookies } from "next/headers";
import { COOKIE_NETWORK_NAME, clientNetworkData } from "./constant";
import { clientNetworkDataSchema } from "./schema";
import { ClientNetworkData } from "./types";

export const getNetworkClientCookie = (): ClientNetworkData => {
  const c = cookies();
  const cookieValue = c.get(COOKIE_NETWORK_NAME)?.value;
  // const cookieValue = "";

  const clientData = cookieValue ? JSON.parse(cookieValue) : clientNetworkData;

  const clientDataParsed = clientNetworkDataSchema.parse(clientData);

  return clientDataParsed;
};
