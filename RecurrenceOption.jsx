 import React, { useContext } from "react";
 import RecurrenceContext from "./RecurrenceContext";

 const FrequencySelector = () => {
   const { recurrence, updateRecurrence } = useContext(RecurrenceContext);

   const handleChange = (e) => {
     updateRecurrence({ frequency: e.target.value });
  };
  return (
    <div>
        <h4>Recurring Pattern</h4>
      <div>
        <input
          type="radio"
          name="frequency"
          value="daily"
          checked={recurrence.frequency === "daily"}
          onChange={handleChange}
        />
        <span>Daily</span>
      </div>
      <div>
        <input
          type="radio"
          name="frequency"
          value="weekly"
          checked={recurrence.frequency === "weekly"}
          onChange={handleChange}
        />
        <span>Weekly</span>
      </div>
      <div>
        <input
          type="radio"
          name="frequency"
          value="monthly"
          checked={recurrence.frequency === "monthly"}
          onChange={handleChange}
        />
        <span>Monthly</span>
      </div>
      <div>
        <input
          type="radio"
          name="frequency"
          value="yearly"
          checked={recurrence.frequency === "yearly"}
          onChange={handleChange}
        />
        <span>Yearly</span>
      </div>
    </div>
    
  );
};

export default FrequencySelector;
