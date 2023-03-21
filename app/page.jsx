"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import links from "@/config/links";
import { toast } from "react-hot-toast";
import TableComponent from "@/components/table/TableComponent";
import SortByComponent from "@/components/home/SortByComponent";

const Home = () => {
  const [borrow, setBorrow] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showTimeStamp, setShowTimeStamp] = useState(false);
  const [activeTableHeader, setActiveTableHeader] = useState({
    active: "No.",
    sort: "asc",
  });

  const fetchBorrow = async () => {
    try {
      const result = await axios.get(`${links.default}/borrow/get/all`);
      return result;
    } catch (error) {
      toast.error("something went wrong, cannot get borrow lists");
    }
  };

  useEffect(() => {
    let ready = true;
    if (ready) fetchBorrow().then((res) => setBorrow(res.data));
    return () => {
      ready = false;
    };
  }, []);

  const sortBorrow = (arr, sort, active) => {
    const borrowCopy = [...arr];
    return borrowCopy.sort((a, b) => {
      if (sort === "asc") {
        if (active === "SSP") return a.SSP > b.SSP ? 1 : -1;
        else if (active === "Property Number")
          return a.propertyNo > b.propertyNo ? 1 : -1;
        else if (active === "Received By")
          return a.receivedBy > b.receivedBy ? 1 : -1;
        else if (active === "Status") return a.status > b.status ? 1 : -1;
        else if (active === "Timestamp")
          return a.createdAt > b.createdAt ? 1 : -1;
        else if (active === "No.") a > b ? 1 : -1;
      } else {
        if (active === "SSP") return a.SSP > b.SSP ? -1 : 1;
        else if (active === "Property Number")
          return a.propertyNo > b.propertyNo ? -1 : 1;
        else if (active === "Received By")
          return a.receivedBy > b.receivedBy ? -1 : 1;
        else if (active === "Status") return a.status > b.status ? -1 : 1;
        else if (active === "Timestamp")
          return a.createdAt > b.createdAt ? -1 : 1;
        else if (active === "No.") a > b ? -1 : 1;
      }
    });
  };

  const sortedBorrow = sortBorrow(
    borrow,
    activeTableHeader.sort,
    activeTableHeader.active
  );

  return (
    <>
      <div className="p-5">
        {/* table menu */}
        <TableComponent
          borrow={sortedBorrow}
          selectAll={selectAll}
          selectedItems={selectedItems}
          setSelectAll={setSelectAll}
          setSelectedItems={setSelectedItems}
          showTimeStamp={showTimeStamp}
          setShowTimeStamp={setShowTimeStamp}
          activeTableHeader={activeTableHeader}
          setActiveTableHeader={setActiveTableHeader}
        />
      </div>
    </>
  );
};

export default Home;
