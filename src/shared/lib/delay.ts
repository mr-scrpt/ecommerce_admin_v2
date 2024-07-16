import { setTimeout as setTimeoutPromise } from "timers/promises";

export async function delay(ms: number) {
  await setTimeoutPromise(ms);
}
