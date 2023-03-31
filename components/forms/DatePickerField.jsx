import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/solid";

const DatePickerField = ({ startDate, setStartDate, label = "" }) => {
  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };
  const addMonths = (date, months) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  };
  return (
    <div className="mt-2">
      {label && (
        <span className="px-3 font-semibold bg-white text-xs w-full">
          {label}
        </span>
      )}
      <div className="flex items-center space-x-1 relative">
        <CalendarIcon height={20} width={20} className="absolute left-2 z-50" />
        <DatePicker
          className="pl-8 border border-gray-400 py-2 rounded-md"
          showTimeSelect
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          maxDate={addMonths(new Date(), 5)}
          timeClassName={handleColor}
          shouldCloseOnSelect={true}
        />
      </div>
    </div>
  );
};

export default DatePickerField;
