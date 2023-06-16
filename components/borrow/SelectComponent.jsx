import React, { useState } from "react";

const options = [
  { id: 1, label: "Finance Office" },
  { id: 2, label: "Cashier's Office" },
  { id: 3, label: "MANCOM Office" },
  { id: 4, label: "UTPRAS Office" },
  { id: 5, label: "Registrar Office" },
  { id: 6, label: "Assessment Office" },
  { id: 7, label: "STAR/APAC Office" },
  { id: 8, label: "Billing Office" },
  { id: 9, label: "Function Hall" },
  { id: 10, label: "SMAW Classroom" },
  { id: 11, label: "Bread and Pastry Production(BPP) ClassRoom" },
  { id: 12, label: "FBS/Barista Classroom" },
  { id: 13, label: "Food Processing Classroom" },
  { id: 14, label: "Cookery Classroom" },
  { id: 15, label: "Driving Classroom" },
  { id: 16, label: "Barangay Health Services (BHS) Classroom" },
  { id: 17, label: "Aquaculture Classroom" },
  { id: 18, label: "Contact Tracing Classroom" },
  { id: 19, label: "Masonry Classroom" },
  { id: 20, label: "Construction Painting Classroom" },
  { id: 21, label: "PVIS Classroom" },
  { id: 22, label: "Housekeeping Classroom" },
  { id: 23, label: "Food Technology Building" },
  { id: 24, label: "Supply Office Warehouse" },
];

const SelectComponent = ({
  selectedOption,
  setSelectedOption,
  customOption,
  setCustomOption,
}) => {
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const handleCustomOptionChange = (event) => {
    const value = event.target.value;
    setCustomOption(value);
  };

  return (
    <div className="w-full flex flex-row gap-1">
      <div className="flex-1">
        <span className="px-3 font-semibold bg-white text-xs w-full">
          Specific Location
        </span>
        <select
          className="form-select relative w-full cursor-default text-left rounded-lg bg-white py-3 border border-gray-400  focus:outline-nonesm:text-sm "
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="">Custom</option>
          {options.map((option) => (
            <option key={option.id} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {selectedOption === "" && (
        <div className="flex flex-col gap-1 justify-end flex-1 items-center">
          <span className="px-3 font-semibold bg-white text-xs w-full whitespace-nowrap">
            Custom Location
          </span>
          <div className="w-full p-[1px] justify-center text-start border border-gray-400 rounded-md">
            <input
              type="text"
              className="py-[0.65rem] px-2 w-full"
              placeholder="Enter a custom option"
              value={customOption}
              onChange={handleCustomOptionChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
