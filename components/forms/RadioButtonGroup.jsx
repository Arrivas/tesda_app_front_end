import React, { useState } from "react";

const RadioButtonGroup = ({ selectedRadioOption, setSelectedRadioGroup }) => {
  const handleOptionChange = (event) => {
    setSelectedRadioGroup(event.target.value);
  };

  return (
    <div className="flex items-center justify-center">
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio text-indigo-600"
          value="Lists"
          checked={selectedRadioOption === "Lists"}
          onChange={handleOptionChange}
        />
        <span className="ml-2 text-gray-700 font-semibold">Lists</span>
      </label>
      <label className="inline-flex items-center ml-6">
        <input
          type="radio"
          className="form-radio text-indigo-600"
          value="Graphs"
          checked={selectedRadioOption === "Graphs"}
          onChange={handleOptionChange}
        />
        <span className="ml-2 text-gray-700 font-semibold">Graphs</span>
      </label>
    </div>
  );
};

export default RadioButtonGroup;
