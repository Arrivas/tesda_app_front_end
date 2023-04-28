"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import links from "../../config/links";
import BorrowChart from "../../components/charts/BorrowChart";
import InventoryChart from "../../components/charts/InventoryChart";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const tabItems = [
  { id: 1, label: "BORROWER" },
  { id: 2, label: "INVENTORY" },
];

const page = () => {
  const user = useSelector((state) => state.user);
  const [borrowStats, setBorrowStats] = useState([]);
  const [inventoryStats, setInventoryStats] = useState([]);
  const [selectedTab, setSelectedTab] = useState("BORROWER");

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
      <div className="flex flex-row space-x-4">
        {tabItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedTab(
                selectedTab === "BORROWER" ? "INVENTORY" : "BORROWER"
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
      <hr className="bg-black h-[1px] w-full my-2" />

      {selectedTab === "BORROWER" ? (
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
