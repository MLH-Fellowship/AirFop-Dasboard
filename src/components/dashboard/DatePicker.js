import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerTool = ({date, setDate, className}) => {
  return (
    <DatePicker 
      style={{marginTop:'20px'}}
      className={className} 
      selected={date} 
      dateFormat="MM/dd/yyyy" 
      onChange={date => setDate(date)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
  );
}

export default DatePickerTool;
