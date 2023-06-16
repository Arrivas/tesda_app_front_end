import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import links from "../../config/links";
import { Combobox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";

const DebounceInput = ({
  searchTerm,
  setSearchTerm,
  searchResults,
  setSearchResults,
  selectedResult,
  setSelectedResult,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${links.default}/borrow/get/search?q=${searchTerm}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        fetchData();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => {
      clearTimeout(delayDebounce);
    };
  }, [searchTerm, setSearchResults]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <span className="px-3 font-semibold bg-white text-xs w-full self-start">
        Property no.
      </span>
      <Combobox value={selectedResult?.propertyNo} onChange={setSelectedResult}>
        <div className="w-full relative flex-1 flex items-center p-[1px] justify-center text-start border border-gray-400 rounded-md">
          <Combobox.Input
            placeholder="Property no."
            className="w-full border-none p-[12px] pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            onChange={handleInputChange}
          />
        </div>
        <Combobox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {searchResults.map((item) => (
            <Combobox.Option
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? "bg-[#0035a9] text-white" : "text-gray-900"
                }`
              }
              key={item.propertyNo}
              value={item}
            >
              <CheckIcon className="hidden ui-selected:block" />
              {item.propertyNo}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default DebounceInput;
