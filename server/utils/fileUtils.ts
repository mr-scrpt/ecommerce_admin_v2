// fileUtils.ts
import fs from "fs";
import { promisify } from "util";

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

const LOG_FILE = "server/cron/api_request.log";
const LAST_REQUEST_DATE_FILE = "server/cron/last_request_date.txt";

export async function createLog(message: string) {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  await writeFileAsync(LOG_FILE, logMessage, { flag: "a" });
}

export async function readLastRequestDate(): Promise<string | null> {
  try {
    const content = await readFileAsync(LAST_REQUEST_DATE_FILE, "utf-8");
    return content;
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function saveLastRequestDate(date: string) {
  await writeFileAsync(LAST_REQUEST_DATE_FILE, date);
}
