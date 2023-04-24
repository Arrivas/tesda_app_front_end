"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import links from "@/config/links";
import BorrowChart from "@/components/charts/BorrowChart";
import InventoryChart from "@/components/charts/InventoryChart";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";

const page = () => {
  const user = useSelector((state) => state.user);
  const [borrowStats, setBorrowStats] = useState([]);
  const [inventoryStats, setInventoryStats] = useState([]);

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
      <div className="flex flex-1 flex-col">
        <BorrowChart
          borrowStats={borrowStats}
          setBorrowStats={setBorrowStats}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <InventoryChart
          inventoryStats={inventoryStats}
          setInventoryStats={setInventoryStats}
        />
      </div>
    </div>
  );
};

export default page;
