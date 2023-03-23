"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import links from "@/config/links";
import { toast } from "react-hot-toast";
import TableComponent from "@/components/table/TableComponent";
import paginate from "@/helper/paginate";
import sortBorrow from "@/helper/sortBorrow";
import Pagination from "@/components/pagination/Pagination";
import TableMenu from "@/components/home/TableMenu";

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
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState({
    name: "",
    label: "filter search by",
  });
  const [showQr, setShowQr] = useState(false);
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
  const paginatedData =
    search && searchFilter.name !== ""
      ? borrow?.filter((item) =>
          item[searchFilter.name].toLowerCase().startsWith(search)
        )
      : borrow?.slice(indexOfFirstItem, indexOfLastItem);

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
        <TableMenu
          search={search}
          setSearch={setSearch}
          searchFilter={searchFilter}
          selectedItems={selectedItems}
          setSearchFilter={setSearchFilter}
        />

        <TableComponent
          showQr={showQr}
          setShowQr={setShowQr}
          borrow={sortedBorrow}
          selectAll={selectAll}
          setSelectAll={setSelectAll}
          selectedItems={selectedItems}
          showTimeStamp={showTimeStamp}
          setShowTimeStamp={setShowTimeStamp}
          setSelectedItems={setSelectedItems}
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
