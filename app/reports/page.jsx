"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import links from "../../config/links";
import BorrowChart from "../../components/charts/BorrowChart";
import InventoryChart from "../../components/charts/InventoryChart";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import BorrowLists from "../../components/lists/BorrowLists";
import InventoryLists from "../../components/lists/InventoryLists";
import RadioButtonGroup from "../../components/forms/RadioButtonGroup";

const tabItems = [
  { id: 1, label: "BORROW" },
  { id: 2, label: "INVENTORY" },
];

const activeMonthItems = [
  { id: 1, label: "January" },
  { id: 2, label: "February" },
  { id: 3, label: "March" },
  { id: 4, label: "April" },
  { id: 5, label: "May" },
  { id: 6, label: "June" },
  { id: 7, label: "July" },
  { id: 8, label: "August" },
  { id: 9, label: "September" },
  { id: 10, label: "October" },
  { id: 11, label: "November" },
  { id: 12, label: "December" },
];

const page = () => {
  const user = useSelector((state) => state.user);
  const [borrowStats, setBorrowStats] = useState([]);
  const [inventoryStats, setInventoryStats] = useState([]);
  const [selectedTab, setSelectedTab] = useState("BORROW");
  const [selectedMonth, setSelectedMonth] = useState({
    id: 999,
    label: activeMonthItems[new Date().getMonth()].label,
  });
  const [selectedRadioOption, setSelectedRadioGroup] = useState("Lists");

  const fetchBorrowStats = async () =>
    axios
      .post(`${links.default}/borrow/get/stats`, { year: 2023 })
      .then((res) => res.data)
      .catch((err) => console.log(err));

  const fetchInventoryStats = async () =>
    axios
      .post(`${links.default}/inventory/get/stats`, { year: 2023 })
      .then((res) => res.data)
      .catch((err) => console.log(err));

  const fetchAllData = async () => {
    const [borrowStats, inventoryStats] = await axios.all([
      fetchBorrowStats(),
      fetchInventoryStats(),
    ]);
    return { borrowStats, inventoryStats };
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchAllData().then((res) => {
        setBorrowStats(res.borrowStats);
        setInventoryStats(res.inventoryStats);
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  if (!user.user) return <Loading />;
  return (
    <div className="flex flex-col h-screen p-5">
      {/* <h1 className="font-bold text-2xl">Reports</h1> */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-4 ">
          {tabItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedTab(
                  selectedTab === "BORROW" ? "INVENTORY" : "BORROW"
                );
              }}
            >
              <h1
                className={`font-semibold text-4xl ${
                  selectedTab === item.label ? "text-gray-800" : "text-gray-100"
                }`}
              >
                {item.label}
              </h1>
            </button>
          ))}
        </div>
        <RadioButtonGroup
          selectedRadioOption={selectedRadioOption}
          setSelectedRadioGroup={setSelectedRadioGroup}
        />
      </div>

      <hr className="bg-black h-[1px] w-full my-2" />

      {selectedRadioOption === "Lists" && selectedTab === "BORROW" ? (
        <BorrowLists
          borrowStats={borrowStats}
          activeMonthItems={activeMonthItems}
          setBorrowStats={setBorrowStats}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      ) : selectedRadioOption === "Lists" && selectedTab === "INVENTORY" ? (
        <InventoryLists
          activeMonthItems={activeMonthItems}
          selectedMonth={selectedMonth}
          inventoryStats={inventoryStats}
          setSelectedMonth={setSelectedMonth}
          setInventoryStats={setInventoryStats}
        />
      ) : selectedRadioOption === "Graphs" && selectedTab === "BORROW" ? (
        <BorrowChart
          borrowStats={borrowStats}
          setBorrowStats={setBorrowStats}
        />
      ) : (
        <InventoryChart
          inventoryStats={inventoryStats}
          setInventoryStats={setInventoryStats}
        />
      )}
    </div>
  );
};

export default page;
