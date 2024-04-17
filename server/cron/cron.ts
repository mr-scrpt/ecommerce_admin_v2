import cron from "node-cron";
import {
  checkAndFetchData,
  cronScheduleSettlement,
} from "./task/fetchSettlement";

// NOTE: First start on server start
checkAndFetchData();

// NOTE: Start on schedule
cron.schedule(cronScheduleSettlement, checkAndFetchData);
