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
import links from "@/config/links";

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
