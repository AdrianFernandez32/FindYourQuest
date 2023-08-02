import moment from "moment-timezone";

export const formattedDate = (date: Date) => {
  return date.toISOString().slice(0, 19).replace("T", " ");
};

export const formattedDateCalendar = (date: Date) => {
  return moment(date).tz("America/Los_Angeles").format("YYYY-MM-DDTHH:mm:ss");
};
