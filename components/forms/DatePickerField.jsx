import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/solid";

const DatePickerField = ({
  startDate,
  setStartDate,
  label = "",
  type = "default",
  isYear = false,
}) => {
  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };
  const addMonths = (date, months) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  };
  return !isYear ? (
    <div className="flex-1">
      {label && (
        <span className="px-3 font-semibold bg-white text-xs w-full">
          {label}
        </span>
      )}
      <div className="flex items-center space-x-1 relative">
        <CalendarIcon
          height={20}
          width={20}
          className="absolute left-3 z-10 text-black"
        />
        <DatePicker
          className="pl-8 border border-gray-400 py-2.5 rounded-md w-full cursor-pointer"
          showTimeSelect
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={type === "default" ? new Date() : null}
          maxDate={addMonths(new Date(), 5)}
          timeClassName={handleColor}
          shouldCloseOnSelect={true}
        />
      </div>
    </div>
  ) : (
    <div className="flex-1">
      {label && (
        <span className="px-3 font-semibold bg-white text-xs w-full">
          {label}
        </span>
      )}
      <div className="flex items-center space-x-1 relative">
        <CalendarIcon
          height={20}
          width={20}
          className="absolute left-3 z-10 text-gray-600"
        />
        <DatePicker
          className="pl-8 shadow-sm border border-gray-100 py-2.5 rounded-md w-full cursor-pointer"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showYearPicker
          dateFormat="yyyy"
        />
      </div>
    </div>
  );
};

export default DatePickerField;
