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
          <th
            onClick={
              t.label === "input" ||
              t.label === "" ||
              t.label === "Classification"
                ? null
                : () =>
                    setActiveTableHeader({
                      active: t.label,
                      sort: activeTableHeader.sort === "asc" ? "desc" : "asc",
                    })
            }
            key={t.id}
            className={`text-[#9b9b9b] font-semibold ${
              t.label === "input" || t.label === ""
                ? "cursor-normal"
                : "cursor-pointer"
            }  ${
              t.label === "input" || t.label === ""
                ? "w-[4%] text-center p-3"
                : t.label === "Qty"
                ? "w-[6%] text-start"
                : t.label === "Received By"
                ? "w-[18%] text-start"
                : t.label === "Status"
                ? "w-[12%] text-start"
                : "text-start"
            }`}
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
        ))}
      </tr>
    </thead>
  );
};

export default THeadComponent;
