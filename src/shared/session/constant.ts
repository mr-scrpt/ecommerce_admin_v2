import { ClientNetworkData } from "./types";

export const COOKIE_NETWORK_NAME = "client.network_data";
export const COOKIE_NETWORK_MAX_AGE = 60;

export const clientNetworkData: ClientNetworkData = {
  ip: "",
  country: "",
  country_name: "",
  country_code: "",
  city: "",
  timezone: "",
};
