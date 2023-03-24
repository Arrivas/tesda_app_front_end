import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const THeadComponent = ({
  theadItems,
  activeTableHeader,
  setActiveTableHeader,
}) => {
  return (
    <thead className="bg-[#f6f6f6] sticky top-0">
      <tr>
        {theadItems.map((t) => (
          <>
            <th
              onClick={() =>
                setActiveTableHeader({
                  active: t.label,
                  sort: activeTableHeader.sort === "asc" ? "desc" : "asc",
                })
              }
              key={t.id}
              className={`text-[#9b9b9b] font-semibold cursor-pointer ${
                t.label === "input"
                  ? "w-[4%] text-center p-3"
                  : t.label === "SSP"
                  ? "w-[22%] text-start"
                  : t.label === "Received By"
                  ? "w-[18%] text-start"
                  : t.label === "Status"
                  ? "w-[12%] text-start"
                  : "text-start"
              }`}
              // ? "w-[5%] p-3 text-center"
              //     : t.label === "No."
              // : t.label === "Status"
              // ? "w-[17%] text-start"
            >
              <a>{t.label === "input" ? t.input : t.label}</a>
              {activeTableHeader.sort === "asc" &&
              activeTableHeader.active === t.label &&
              t.label !== "No." &&
              t.label !== "input" ? (
                <ChevronUpIcon className="text-black h-3 w-3 inline" />
              ) : (
                activeTableHeader.sort === "desc" &&
                activeTableHeader.active === t.label &&
                t.label !== "No." &&
                t.label !== "input" && (
                  <ChevronDownIcon className="text-black h-3 w-3 inline" />
                )
              )}
            </th>
          </>
        ))}
      </tr>
    </thead>
  );
};

export default THeadComponent;
