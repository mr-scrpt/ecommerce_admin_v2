import {
  createLog,
  readLastRequestDate,
  saveLastRequestDate,
} from "../../utils/fileUtils";

const API_URL = `${process.env.BASE_URL}/${process.env.API_INIT_SETTLEMENT_URL}`;

export const cronScheduleSettlement = "0 14 * * *";

export async function checkAndFetchData() {
  const lastRequestDate = await readLastRequestDate();
  const currentDate = new Date().toISOString().slice(0, 10);

  if (!lastRequestDate || lastRequestDate !== currentDate) {
    try {
      console.log("Fetching settlement from API...");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Settlement fetched successfully:", await response.json());

      await createLog(
        `Data fetched successfully at ${new Date().toLocaleString()}`,
      );

      await saveLastRequestDate(currentDate);
    } catch (error) {
      console.error("Error fetching data:", error);
      await createLog(
        `Error fetching data at ${new Date().toLocaleString()}: ${error.message}`,
      );
    }
  } else {
    console.log(
      "API request to fetch settlement already made today, skipping...",
    );
  }
}
