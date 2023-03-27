import React from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const BorrowedSelect = ({ isBorrowed, setIsBorrowed }) => {
  const borrowedItems = [
    { id: 1, label: "borrowed", isBorrowed: true },
    { id: 2, label: "returned", isBorrowed: false },
  ];

  return (
    <div className="w-full">
      <Listbox value={borrowedItems} onChange={setIsBorrowed}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default text-left rounded-lg bg-white py-3 border border-gray-200 pl-3 pr-10 text-leftfocus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 sm:text-sm">
            <span className="block truncate">{isBorrowed.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-black"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {borrowedItems.map((item) => (
              <Listbox.Option
                onClick={() => setIsBorrowed(item)}
                key={item.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-[#0035a9] text-white" : "text-gray-900"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`text-left ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default BorrowedSelect;