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
import axios from "axios";
import DatePickerField from "../forms/DatePickerField";
import links from "../../config/links";

const InventoryChart = ({ inventoryStats, setInventoryStats }) => {
  const [yearSelect, setYearSelect] = useState(new Date());

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

  const handleOnBarClick = (data) => {
    console.log(data?.activePayload[0].payload?.objects);
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
          } ${new Date(yearSelect).getFullYear()} Inventory Report</h1>
          <body>
            <table>
              <thead>
              <tr>
              <th>Category</th>
              <th>Property No.</th>
              <th>Equipment</th>
              <th>Qty</th>
              <th>Receiver</th>
                </tr>
              </thead>
              <tbody>
                ${data?.activePayload[0].payload?.objects
                  .map(
                    (item) =>
                      `<tr>
                    <td>${item.type.toUpperCase()}</td>
                    <td>${item.propertyNo}</td>  
                    <td>${item.equipment}</td>
                    <td>${item.qty}</td>
                    <td>${item.receiver}</td>
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
        <h1 className="text-2xl font-semibold flex-1">Inventory</h1>
        <div className="">
          <DatePickerField
            isYear={true}
            label="year"
            startDate={yearSelect}
            setStartDate={handleSetYear}
          />
        </div>
      </div>
      <ResponsiveContainer className="mt-2" width="98%" height="100%">
        <BarChart
          data={inventoryStats}
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
          <Bar dataKey="ssp" fill="#4C859B" />
          <Bar dataKey="101" fill="#D9B08C" />
          <Bar dataKey="total" fill="#8C6D9B" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default InventoryChart;
