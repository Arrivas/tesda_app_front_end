import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const people = [
  { id: 1, name: "", label: "select search filter" },
  { id: 2, name: "propertyNo", label: "Property No." },
  { id: 3, name: "equipment", label: "Equipment" },
  { id: 4, name: "fullName", label: "Name" },
  { id: 5, name: "role", label: "Role" },
];

const SearchFilter = ({ searchFilter, setSearchFilter }) => {
  return (
    <div className="w-full flex items-center border border-gray-200 rounded-md">
      <Listbox value={searchFilter} onChange={setSearchFilter}>
        <div className="relative mt-1 cursor-pointer w-full">
          <Listbox.Button className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
            <span
              className={`block truncate ${
                searchFilter.label === "select search filter"
                  ? "text-gray-400"
                  : "text-black"
              }`}
            >
              {searchFilter.label}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {people.map((filter, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-[#0035a9] text-white"
                        : filter.label === "select search filter"
                        ? "text-gray-300"
                        : "text-gray-900"
                    }`
                  }
                  value={filter}
                  disabled={filter.label === "select search filter"}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {filter.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#0035a9]">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SearchFilter;
