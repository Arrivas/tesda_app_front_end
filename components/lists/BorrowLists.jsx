"use client";
import React, { useState } from "react";
import SelectForm from "../forms/SelectForm";
import DatePickerField from "../forms/DatePickerField";
import axios from "axios";
import { PrinterIcon } from "@heroicons/react/24/solid";

const activeFilterItems = [
  { id: 1, label: "All", value: "all" },
  { id: 2, label: "Borrow", value: "borrow" },
  { id: 3, label: "Return", value: "return" },
];

const BorrowLists = ({
  borrowStats,
  activeMonthItems,
  setBorrowStats,
  selectedMonth,
  setSelectedMonth,
}) => {
  const [yearSelect, setYearSelect] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState(activeFilterItems[0]);

  const handleSetYear = async (date) => {
    setYearSelect(date);
    const newDate = new Date(date);
    await axios
      .post(`${links.default}/borrow/get/stats`, {
        year: newDate.getFullYear(),
      })
      .then((res) => setBorrowStats(res.data))
      .catch((err) => console.log(err));
  };

  const handlePrint = () => {
    const filteredData = activeFilter
      ? borrowStats
          .filter((item) => item.month === selectedMonth.label)[0]
          ?.objects.filter((item) => {
            if (activeFilter.value === "borrow" && item.return === "borrowed") {
              return item;
            } else if (
              activeFilter.value === "return" &&
              item.return === "returned"
            ) {
              return item;
            } else if (activeFilter.value === "all") {
              return item;
            }
          })
      : borrowStats.filter((item) => item.month === selectedMonth.label)[0]
          ?.objects;
    if (borrowStats.filter((item) => item.month === selectedMonth.label)[0]) {
      const printWindow = window.open("", "Print Table");
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Table</title>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th,
              td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid #ddd;
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <h1 style='text-align:center'>${selectedMonth.label} ${new Date(
        yearSelect
      ).getFullYear()} Borrow Report</h1>
          <body>
            <table>
              <thead>
                <tr>
                  <th>Property No.</th>
                  <th>Equipment</th>
                  <th>Borrower Name</th>
                  <th>Intention</th>
                  <th>Location</th>
                  <th>Condition</th>
                </tr>
              </thead>
              <tbody>
                ${filteredData
                  ?.map(
                    (item) =>
                      `<tr>
                        <td>${item.propertyNo}</td>
                        <td>${item.equipment}</td>
                        <td>${item.borrowerName}</td>
                        <td>${item.intention}</td>
                        <td>${item.location}</td>
                        <td>${item.condition || "none"}</td>
                      </tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-1 self-end mb-3">
        <div className="col-span-1">
          <SelectForm
            type="simple"
            label="month"
            select={selectedMonth}
            onSetSelect={setSelectedMonth}
            selectItems={activeMonthItems}
          />
        </div>
        <div className="col-span-1">
          <DatePickerField
            isYear={true}
            label="year"
            startDate={yearSelect}
            setStartDate={handleSetYear}
          />
        </div>

        <div className="col-span-1">
          <SelectForm
            type="simple"
            label="filter"
            select={activeFilter}
            onSetSelect={setActiveFilter}
            selectItems={activeFilterItems}
          />
        </div>

        {/* print */}
        <button
          title="print"
          onClick={handlePrint}
          className="h-[45px] self-end flex items-center hover:bg-[#2c51a0] bg-[#0035A9] p-2 px-3 rounded-md space-x-1"
        >
          <PrinterIcon className="h-4 w-4 text-white" />
          <span className="text-white font-semibold">print</span>
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-[#f2f2f2] text-left">Property No.</th>
            <th className="bg-[#f2f2f2] text-left">Equipment</th>
            <th className="bg-[#f2f2f2] text-left">Borrower Name</th>
            <th className="bg-[#f2f2f2] text-left">Intention</th>
            <th className="bg-[#f2f2f2] text-left">Location</th>
            <th className="bg-[#f2f2f2] text-left">Condition</th>
          </tr>
        </thead>
        <tbody>
          {borrowStats
            ?.filter((item) => item.month === selectedMonth.label)[0]
            ?.objects.filter((item) => {
              if (
                activeFilter.value === "borrow" &&
                item.return === "borrowed"
              ) {
                return item;
              } else if (
                activeFilter.value === "return" &&
                item.return === "retunred"
              ) {
                return item;
              } else if (activeFilter.value === "all") {
                return item;
              }
            })

            ?.map((item, index) => (
              <tr key={index}>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.propertyNo}
                </td>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.equipment}
                </td>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.borrowerName}
                </td>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.intention}
                </td>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.location}
                </td>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.condition}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {borrowStats?.filter((item) => item.month === selectedMonth.label)[0]
        ?.objects.length === 0 && (
        <div className="flex justify-center items-center w-full h-full ">
          <h2 className="font-semibold text-gray-400">no items to show</h2>
        </div>
      )}
    </>
  );
};

export default BorrowLists;
