import { format } from "date-fns";

export const buildDate = (date: Date | string) => {
  // return format(date, "do MMMM, yyyy");
  const currentDate = typeof date === "string" ? new Date(date) : date;

  return format(currentDate, "do MMMM, yyyy");
};
