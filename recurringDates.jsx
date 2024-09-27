import moment from "moment";


export const getRecurringDates = (recurrence) => {
  const { frequency, startDate, endDate, interval, daysOfWeek } = recurrence;
  const recurringDates = [];
  const start = moment(startDate);
  const end = moment(endDate);

  if (!startDate || !endDate) return recurringDates;

  
  if (frequency === "daily") {
    for (let date = start.clone(); date.isBefore(end) || date.isSame(end); date.add(interval, 'days')) {
      recurringDates.push(date.clone().toDate());
    }
  }

  
  if (frequency === "weekly") {
    for (let date = start.clone(); date.isBefore(end) || date.isSame(end); date.add(1, 'days')) {
      if (daysOfWeek.includes(date.day())) {
        recurringDates.push(date.clone().toDate());
      }
    }
  }


  if (frequency === "monthly") {
    for (let date = start.clone(); date.isBefore(end) || date.isSame(end); date.add(interval, 'months')) {
      recurringDates.push(date.clone().toDate());
    }
  }

  return recurringDates;
};
