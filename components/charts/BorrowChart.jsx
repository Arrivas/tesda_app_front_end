import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import DatePickerField from "../forms/DatePickerField";
import axios from "axios";
import links from "../../config/links";

const BorrowChart = ({ borrowStats, setBorrowStats }) => {
  const [yearSelect, setYearSelect] = useState(new Date());
  const [checkItems, setCheckItems] = useState([
    { id: 1, label: "Borrows", value: "borrows", checked: false },
    { id: 2, label: "Returns", value: "returns", checked: false },
  ]);
  const [checkFilter, setCheckFilter] = useState("");

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

  const handleOnBarClick = (data) => {
    const filteredData = checkFilter
      ? data.activePayload[0].payload.objects.filter((item) => {
          if (checkFilter === "borrows" && item.return === "borrowed") {
            return item;
          } else if (checkFilter === "returns" && item.return === "returned") {
            return item;
          }
        })
      : data.activePayload[0].payload.objects;
    if (data && data.activePayload && data.activePayload.length > 0) {
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
          <h1 style='text-align:center'>${
            data.activePayload[0].payload.month
          } ${new Date(yearSelect).getFullYear()} Borrow Report</h1>
          <body>
            <table>
              <thead>
                <tr>
                  <th>Property No.</th>
                  <th>Equipment</th>
                  <th>Borrower Name</th>
                  <th>Intention</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                ${filteredData
                  .map(
                    (item) =>
                      `<tr>
                        <td>${item.propertyNo}</td>
                        <td>${item.equipment}</td>
                        <td>${item.borrowerName}</td>
                        <td>${item.intention}</td>
                        <td>${item.location}</td>
                        <td>${item.return}</td>
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

  const handlecheckChange = (onChangeItem) => {
    const index = checkItems.indexOf(onChangeItem);
    const newCheckItems = checkItems.map((item, i) => ({
      ...item,
      checked: i === index ? !item.checked : false,
    }));
    setCheckItems(newCheckItems);
    setCheckFilter(newCheckItems[index].value);
  };

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-2xl font-semibold flex-1">Borrower Report</h1>
        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-1">
            <DatePickerField
              isYear={true}
              label="year"
              startDate={yearSelect}
              setStartDate={handleSetYear}
            />
          </div>
          <div className="col-span-1 items-start justify-center flex flex-col ml-1">
            <span className="font-semibold bg-white text-xs w-full">
              select
            </span>
            {checkItems.map((item) => (
              <div key={item.id} className="flex flex-row items-center">
                <input
                  type="checkbox"
                  name={item.value}
                  onChange={() => handlecheckChange(item)}
                  checked={item.checked}
                />
                <p className="ml-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ResponsiveContainer className="mt-2 " width="98%" height="100%">
        <BarChart
          data={borrowStats}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onClick={handleOnBarClick}
          className="cursor-pointer"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey={"borrows"} fill="#8884d8" />
          <Bar dataKey={"returns"} fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BorrowChart;
