import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const THeadComponent = ({
  theadItems,
  activeTableHeader,
  setActiveTableHeader,
}) => {
  return (
    <thead className="bg-[#f6f6f6]">
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
                  ? "w-[5%] p-3 text-center"
                  : t.label === "No."
                  ? "w-[4%] text-start"
                  : "text-start"
              }`}
            >
              <a>{t.label === "input" ? t.input : t.label}</a>
              {t.label !== "input" &&
                activeTableHeader.active === t.label &&
                (activeTableHeader.sort === "asc" ? (
                  <ChevronUpIcon className="text-black h-3 w-3 inline" />
                ) : (
                  <ChevronDownIcon className="text-black h-3 w-3 inline" />
                ))}
            </th>
          </>
        ))}
      </tr>
    </thead>
  );
};

export default THeadComponent;
