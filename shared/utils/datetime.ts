import { differenceInCalendarDays, format } from "date-fns";

export function formatToAbrFormat(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = format(date, "EEE, MMM dd");
  return formattedDate;
}

export function daysDifferCount(before: string | Date, after: string | Date): number {
  return differenceInCalendarDays(new Date(before), new Date(after));
}
