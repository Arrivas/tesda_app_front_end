import React, { useState } from "react";
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
import SelectForm from "@/components/forms/SelectForm";
import DatePickerField from "../forms/DatePickerField";
import axios from "axios";
import links from "@/config/links";

const activeBorrowItems = [
  { id: 1, label: "Total Borrows", value: "total" },
  { id: 2, label: "Condition", value: "condition" },
];

const BorrowChart = ({ borrowStats, setBorrowStats }) => {
  const [activeBorrow, setActiveBorrow] = useState(activeBorrowItems[0]);
  const [yearSelect, setYearSelect] = useState(new Date());

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
                  <th>Condition</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                ${data?.activePayload[0].payload?.objects
                  .map(
                    (item) =>
                      `<tr>
                        <td>${item.propertyNo}</td>  
                        <td>${item.equipment}</td>
                        <td>${item.borrowerName}</td>
                        <td>${item.condition}</td>
                        <td>${item.location}</td>
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
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-2xl font-semibold flex-1">Borrow</h1>
        <div className="grid grid-cols-2 gap-1">
          <div className="col-span-1">
            <SelectForm
              type="simple"
              label="filter"
              select={activeBorrow}
              onSetSelect={setActiveBorrow}
              selectItems={activeBorrowItems}
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
        </div>
      </div>
      <ResponsiveContainer className="mt-2" width="98%" height="100%">
        <BarChart
          data={borrowStats}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onClick={handleOnBarClick}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar
            dataKey={activeBorrow.value === "total" ? "borrows" : "serviceable"}
            fill="#8884d8"
          />
          <Bar
            dataKey={
              activeBorrow.value === "total" ? "returns" : "unserviceable"
            }
            fill="#82ca9d"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BorrowChart;
