import moment from "moment";

export function classNames(...classes: (string | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getFormattedLocalDateTime(date: string | number) {
  try {
    return moment.utc(date).local().format("MMMM Do YYYY, h:mm:ss a");
  } catch {
    return "Not Available";
  }
}
