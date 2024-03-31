import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { COOKIE_NETWORK_NAME, clientNetworkData } from "./constant";
import { clientNetworkDataSchema } from "./schema";
import { ClientNetworkData } from "./types";
import { cookies } from "next/headers";

export const getNetworkClientCookie = (): ClientNetworkData => {
  const c = cookies();
  const cookieValue = c.get(COOKIE_NETWORK_NAME)?.value;

  const clientData = cookieValue ? JSON.parse(cookieValue) : clientNetworkData;

  const clientDataParsed = clientNetworkDataSchema.parse(clientData);

  return clientDataParsed;
};
