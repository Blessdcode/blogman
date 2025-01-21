import moment from "moment";

export const newDate = moment().format("YYYY-MM-DD");
export const newDay = moment().format("dddd");
export const newTime = moment().format("HH:mm:ss");
export const newDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

type DateType = {
  createdAt: string;
};

export const formatTime = (createdAt: DateType) => {
  const now = moment();
  const created = moment(createdAt.createdAt);

  // if the task was created today
  if (created.isSame(now, "day")) {
    return "Today";
  }

  // if the task was created yesterday
  if (created.isSame(now.subtract(1, "days"), "day")) {
    return "Yesterday";
  }

  // check if created with the last 7 days
  if (created.isAfter(moment().subtract(6, "days"))) {
    return created.fromNow();
  }

  // if item was created within the last 4 weeks (up to 1 month ago)
  if (created.isAfter(moment().subtract(3, "weeks"), "week")) {
    return created.fromNow();
  }

  return created.format("DD/MM/YYYY");
};
