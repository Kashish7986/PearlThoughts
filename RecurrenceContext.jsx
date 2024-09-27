import React, { createContext, useState } from "react";

const RecurrenceContext = createContext();

export const RecurrenceProvider = ({ children }) => {
  const [recurrence, setRecurrence] = useState({
    frequency: "daily",  
    interval: 1,         
    daysOfWeek: [],      
        nthDayOfMonth: null, 
    startDate: new Date(),
    endDate: null,
  });

  const updateRecurrence = (newRecurrence) => {
    setRecurrence((prev) => ({ ...prev, ...newRecurrence }));
  };

  return (
    <RecurrenceContext.Provider value={{ recurrence, updateRecurrence }}>
      {children}
    </RecurrenceContext.Provider>
  );
};

export default RecurrenceContext;
