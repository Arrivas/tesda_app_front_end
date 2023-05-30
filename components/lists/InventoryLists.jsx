"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectForm from "../forms/SelectForm";
import DatePickerField from "../forms/DatePickerField";
import { PrinterIcon } from "@heroicons/react/24/solid";
import links from "../../config/links";

const activeFilterItems = [
  { id: 1, label: "All", value: "all" },
  { id: 2, label: "SSP", value: "ssp" },
  { id: 3, label: "101", value: "101" },
];

const InventoryLists = ({
  inventoryStats,
  selectedMonth,
  setSelectedMonth,
  setInventoryStats,
  activeMonthItems,
}) => {
  const [yearSelect, setYearSelect] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState(activeFilterItems[0]);

  const handleSetYear = async (date) => {
    setYearSelect(date);
    const newDate = new Date(date);
    await axios
      .post(`${links.default}/inventory/get/stats`, {
        year: newDate.getFullYear(),
      })
      .then((res) => setInventoryStats(res.data))
      .catch((err) => console.log(err));
  };

  const handlePrint = () => {
    const filteredData = activeFilter
      ? inventoryStats
          .filter((item) => item.month === selectedMonth.label)[0]
          ?.objects.filter((item) => {
            if (activeFilter.value === "ssp" && item.type === "ssp") {
              return item;
            } else if (activeFilter.value === "101" && item.type === "101") {
              return item;
            } else if (activeFilter.value === "all") {
              return item;
            }
          })
      : inventoryStats.filter((item) => item.month === selectedMonth.label)[0]
          ?.objects;
    if (
      inventoryStats.filter((item) => item.month === selectedMonth.label)[0]
    ) {
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
            <th>Category</th>
            <th>Property No.</th>
            <th>Equipment</th>
            <th>Qty</th>
            <th>Receiver</th>
            <th>Unit</th>
            <th>Amount</th>
            <th>Classification</th>
            <th>Condition</th>
              </tr>
            </thead>
              <tbody>
                ${filteredData
                  ?.map(
                    (item) =>
                      `<tr>
                    <td>${item.type.toUpperCase()}</td>
                    <td>${item.propertyNo}</td>
                    <td>${item.equipment}</td>
                    <td>${item.qty}</td>
                    <td>${item.receiver}</td>
                    <td>${item.unit}</td>
                    <td>${item.amount}</td>
                    <td>${item.classification}</td>
                    <td>${item.condition}</td>
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
            <th className="bg-[#f2f2f2] text-left">Category</th>
            <th className="bg-[#f2f2f2] text-left">Property No.</th>
            <th className="bg-[#f2f2f2] text-left">Equipment</th>
            <th className="bg-[#f2f2f2] text-left">Qty</th>
            <th className="bg-[#f2f2f2] text-left">Receiver</th>
            <th className="bg-[#f2f2f2] text-left">Unit</th>
            <th className="bg-[#f2f2f2] text-left">Amount</th>
            <th className="bg-[#f2f2f2] text-left">Classification</th>
            <th className="bg-[#f2f2f2] text-left">Condition</th>
          </tr>
        </thead>
        <tbody>
          {inventoryStats
            ?.filter((item) => item.month === selectedMonth.label)[0]
            ?.objects?.map((item, index) => (
              <tr key={index}>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.type.toUpperCase()}
                </td>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.propertyNo}
                </td>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.equipment}
                </td>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.qty}
                </td>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.receiver}
                </td>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.unit}
                </td>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.amount}
                </td>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.classification}
                </td>
                <td className="p-[8px] text-left border-b border-[#ddd]">
                  {item.condition}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {inventoryStats?.filter((item) => item.month === selectedMonth.label)[0]
        ?.objects.length === 0 && (
        <div className="flex justify-center items-center w-full h-full ">
          <h2 className="font-semibold text-gray-400">no items to show</h2>
        </div>
      )}
    </>
  );
};

export default InventoryLists;
