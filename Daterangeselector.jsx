import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import RecurrenceContext from "./RecurrenceContext"; 
import './stylefolder/calendar.css';


const DateRangePicker = () => {
  const { recurrence, updateRecurrence } = useContext(RecurrenceContext);

  // Initialize state from context
  const [startDate, setStartDate] = useState(
    moment(recurrence.startDate).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    recurrence.endDate ? moment(recurrence.endDate).format("YYYY-MM-DD") : ""
  );
  const [error, setError] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    if (startDate && !error.startDate && !error.endDate) {
      updateRecurrence({ startDate: new Date(startDate), endDate: endDate ? new Date(endDate) : undefined });
    }
  }, [startDate, endDate, error, updateRecurrence]);

  const handleStartDateChange = (e) => {
    const selectedStartDate = moment(e.target.value);
    const today = moment();

    if (selectedStartDate.isBefore(today, "day")) {
      setError((prevError) => ({
        ...prevError,
        startDate: "Start date cannot be in the past.",
      }));
    } else {
      setError((prevError) => ({ ...prevError, startDate: "" }));
      setStartDate(e.target.value);

      if (endDate && moment(endDate).isBefore(selectedStartDate, "day")) {
        setError((prevError) => ({
          ...prevError,
          endDate: "End date must be after the start date.",
        }));
      } else {
        setError((prevError) => ({ ...prevError, endDate: "" }));
      }
    }
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = moment(e.target.value);
    const selectedStartDate = moment(startDate);

    if (selectedEndDate.isBefore(selectedStartDate, "day")) {
      setError((prevError) => ({
        ...prevError,
        endDate: "End date cannot be before the start date.",
      }));
    } else {
      setError((prevError) => ({ ...prevError, endDate: "" }));
      setEndDate(e.target.value);
    }
  };

  return (
    <div className="daterange">
        <h4>Date Range</h4>
      <label>Start Date: </label>
      <input
        type="date"
        value={startDate}
        min={moment().format("YYYY-MM-DD")}
        onChange={handleStartDateChange}
      />
      {error.startDate && <p style={{ color: "red" }}>{error.startDate}</p>}
      <br />

      <label>End Date (optional): </label>
      <input
        type="date"
        value={endDate}
        min={startDate}
        onChange={handleEndDateChange}
        disabled={!startDate}
      />
      {error.endDate && <p style={{ color: "red" }}>{error.endDate}</p>}
    </div>
  );
};

export default DateRangePicker;




