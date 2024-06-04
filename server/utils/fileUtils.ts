import { writeFile, readFile } from "fs/promises";

const LOG_FILE = "server/cron/api_request.log";
const LAST_REQUEST_DATE_FILE = "server/cron/last_request_date.txt";

export async function createLog(message: string) {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  await writeFile(LOG_FILE, logMessage, { flag: "a" });
}

export async function readLastRequestDate(): Promise<string | null> {
  try {
    const content = await readFile(LAST_REQUEST_DATE_FILE, "utf-8");
    return content;
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function saveLastRequestDate(date: string) {
  await writeFile(LAST_REQUEST_DATE_FILE, date);
}
