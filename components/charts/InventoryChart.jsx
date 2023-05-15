import React, { useState, useEffect } from "react";
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
import SelectForm from "../forms/SelectForm";

const activeBorrowItems = [
  { id: 1, label: "Inventory", value: "inventory" },
  { id: 2, label: "Condition", value: "condition" },
];

const InventoryChart = ({ inventoryStats, setInventoryStats }) => {
  const [yearSelect, setYearSelect] = useState(new Date());
  const [activeBorrow, setActiveBorrow] = useState(activeBorrowItems[0]);
  const [checkItems, setCheckItems] = useState([
    { id: 1, label: "SSP", value: "ssp", checked: false },
    { id: 2, label: "101", value: "101", checked: false },
  ]);
  const [checkFilter, setCheckFilter] = useState("");

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

  const handlecheckChange = (onChangeItem) => {
    const index = checkItems.indexOf(onChangeItem);
    const newCheckItems = checkItems.map((item, i) => ({
      ...item,
      checked: i === index ? !item.checked : false,
    }));
    setCheckItems(newCheckItems);
    setCheckFilter(newCheckItems[index].value);
  };

  useEffect(() => {
    setCheckItems(
      activeBorrow.value === "inventory"
        ? [
            { id: 1, label: "SSP", value: "ssp", checked: false },
            { id: 2, label: "101", value: "101", checked: false },
          ]
        : [
            {
              id: 1,
              label: "Serviceable",
              value: "serviceable",
              checked: false,
            },
            {
              id: 2,
              label: "Unserviceable",
              value: "unserviceable",
              checked: false,
            },
          ]
    );
  }, [activeBorrow]);

  const handleOnBarClick = (data) => {
    const filteredData = checkFilter
      ? data.activePayload[0].payload.objects.filter((item) => {
          if (activeBorrow.value === "inventory") {
            if (checkFilter === "ssp" && item.type === "ssp") {
              return item;
            } else if (checkFilter === "101" && item.type === "101") {
              return item;
            }
          } else {
            if (
              checkFilter === "serviceable" &&
              item.condition === "Serviceable"
            ) {
              return item;
            } else if (
              checkFilter === "unserviceable" &&
              item.condition === "Unserviceable"
            ) {
              return item;
            }
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
  console.log(inventoryStats);
  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-2xl font-semibold flex-1">Inventory</h1>
        <div className="grid grid-cols-3 gap-1">
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
          <Bar
            dataKey={activeBorrow.value === "inventory" ? "ssp" : "serviceable"}
            fill="#4C859B"
          />
          <Bar
            dataKey={
              activeBorrow.value === "inventory" ? "101" : "unserviceable"
            }
            fill="#D9B08C"
          />
          <Bar dataKey="total" fill="#8C6D9B" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default InventoryChart;
