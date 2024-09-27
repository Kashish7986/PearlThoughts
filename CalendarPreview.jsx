import React, { useContext, useState } from "react";
import RecurrenceContext from "./RecurrenceContext";
import Calendar from "react-calendar";
import moment from "moment";
import 'react-calendar/dist/Calendar.css';  
import './stylefolder/calendar.css';  

const CalendarPreview = () => {
  const { recurrence } = useContext(RecurrenceContext);
  const { startDate, endDate, frequency, interval, daysOfWeek, weekOfMonth, dayOfWeek } = recurrence;

  const [value, setValue] = useState(new Date());

  // Generate recurring dates based on the frequency
  const getRecurringDates = () => {
    const recurringDates = [];
    let currentDate = moment(startDate);

    // Check if endDate is valid
    const end = moment(endDate || new Date()); // Use today if endDate is null

    while (currentDate.isSameOrBefore(end)) {
      // For daily frequency
      if (frequency === "daily") {
        recurringDates.push(currentDate.clone().toDate());
      }

      // For weekly frequency
      else if (frequency === "weekly") {
        if (daysOfWeek.includes(getDayOfWeek(currentDate.toDate()))) {
          recurringDates.push(currentDate.clone().toDate());
        }
      }

      // For monthly frequency
      else if (frequency === "monthly") {
        const weekOfCurrent = getWeekOfMonth(currentDate);
        if (weekOfMonth && weekOfCurrent === weekOfMonth && getDayOfWeek(currentDate.toDate()) === dayOfWeek) {
          recurringDates.push(currentDate.clone().toDate());
        }
      }

      // Increment date based on frequency
      currentDate.add(interval, frequency === "weekly" ? 'weeks' : 'months');
    }

    return recurringDates;
  };

  const recurringDates = getRecurringDates();

  // Function to check if a date should be highlighted
  const tileClassName = ({ date }) => {
    return recurringDates.some(recurringDate =>
      moment(date).isSame(moment(recurringDate), 'day')
    )
      ? 'highlight'  // Add a custom CSS class to highlight the date
      : null;
  };

  // Helper to get the day of the week
  const getDayOfWeek = (date) => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return days[date.getDay()];
  };

  // Helper to get the week of the month
  const getWeekOfMonth = (date) => {
    const firstDayOfMonth = moment(date).startOf('month');
    const weekNumber = Math.ceil((moment(date).date() + firstDayOfMonth.day()) / 7);
    if (weekNumber === 0) return "last";
    if (weekNumber === 1) return "first";
    if (weekNumber === 2) return "second";
    if (weekNumber === 3) return "third";
    if (weekNumber === 4) return "fourth";
    return "last";
  };

  return (
    <div className="calendar">
      <h4>Calendar Preview</h4>
      <Calendar
        value={value}
        onChange={setValue}
        tileClassName={tileClassName} 
     
      />
      <style>
         {`
           .highlight {
             background-color: red !important;
             color: white !important;
             border-radius: 50%;
           }
         `}
       </style>
    </div>
  );
};

export default CalendarPreview;
