import { Session } from "next-auth";

export type ClientNetworkData = {
  ip: string;
  country: string;
  country_name: string;
  country_code: string;
  city: string;
  timezone: string;
};

// NOTE: Payload
export type SessionWithDataPayload = {
  session: Session;
  userId: string;
};
