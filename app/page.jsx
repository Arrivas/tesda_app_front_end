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
  const [activeTableHeader, setActiveTableHeader] = useState({
    active: "Timestamp",
    sort: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState({
    name: "",
    label: "select search filter",
  });
  const [showNew, setShowNew] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [selectedQr, setSelectedQr] = useState([]);

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

  const sortedBorrow = sortBorrow(
    borrow,
    activeTableHeader.sort,
    activeTableHeader.active
  );

  const indexOfLastItem = currentPage * 20;
  const indexOfFirstItem = indexOfLastItem - 20;
  const paginatedData =
    search && searchFilter.name !== ""
      ? sortedBorrow?.filter((item) =>
          item[searchFilter.name].toLowerCase().startsWith(search)
        )
      : sortedBorrow?.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = paginate(20, borrow?.length);

  const onNewSubmit = async (values) => {
    await axios
      .post(`${links.default}/borrow/new`, values)
      .then((res) => {
        setShowNew(false);
        setBorrow((prevState) => [...prevState, res?.data]);
        toast.success("added successfully");
      })
      .catch((err) => toast.error("failed, something went wrong"));
  };

  const handleDelete = async () => {
    const toDelete = selectedItems.map((item) => item._id);
    await axios
      .post(`${links.default}/borrow/delete/multiple`, { toDelete })
      .then((res) => toast.success(res.data.message))
      .catch((err) => toast.error("failed, something went wrong"));
    // update db
    let borrowCopy = [...borrow];
    borrowCopy = borrowCopy.filter(
      (item) => !selectedItems.some((s) => s._id === item._id)
    );
    setBorrow(borrowCopy);
    setSelectedItems([]);
  };

  return (
    <>
      <div className="p-5 h-screen flex flex-col">
        {/* table menu */}

        <TableMenu
          showNew={showNew}
          setShowNew={setShowNew}
          handleDelete={handleDelete}
          showQr={showQr}
          search={search}
          setShowQr={setShowQr}
          setSearch={setSearch}
          selectedQr={selectedQr}
          searchFilter={searchFilter}
          selectedItems={selectedItems}
          setSearchFilter={setSearchFilter}
          onNewSubmit={onNewSubmit}
        />

        <TableComponent
          showQr={showQr}
          setShowQr={setShowQr}
          borrow={paginatedData}
          selectAll={selectAll}
          selectedQr={selectedQr}
          setSelectedQr={setSelectedQr}
          setSelectAll={setSelectAll}
          selectedItems={selectedItems}
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
