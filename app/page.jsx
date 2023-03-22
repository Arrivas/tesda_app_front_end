"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import links from "@/config/links";
import { toast } from "react-hot-toast";
import TableComponent from "@/components/table/TableComponent";
import paginate from "@/helper/paginate";
import sortBorrow from "@/helper/sortBorrow";
import Pagination from "@/components/pagination/Pagination";

const Home = () => {
  const [borrow, setBorrow] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showTimeStamp, setShowTimeStamp] = useState(false);
  const [activeTableHeader, setActiveTableHeader] = useState({
    active: "SSP",
    sort: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

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

  const indexOfLastItem = currentPage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;
  const paginatedData = borrow?.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = paginate(5, borrow?.length);

  const sortedBorrow = sortBorrow(
    paginatedData,
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
        {borrow?.length > 5 && (
          <Pagination
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default Home;
