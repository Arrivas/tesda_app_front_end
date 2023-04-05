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
import TableComponentInventory from "@/components/table/TableComponentInventory";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeTableHeader, setActiveTableHeader] = useState({
    active: "Purchase Date",
    sort: "desc",
  });
  const [showQr, setShowQr] = useState(false);
  const [selectedQr, setSelectedQr] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState({
    name: "",
    label: "select search filter",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [showNew, setShowNew] = useState(false);

  const fetchInventory = async () => {
    try {
      const result = await axios.get(`${links.default}/inventory/get/all`);
      return result;
    } catch (error) {
      toast.error("something went wrong, cannot get borrow lists");
    }
  };

  const sortedInventory = sortBorrow(
    inventory,
    activeTableHeader.sort,
    activeTableHeader.active
  );

  const indexOfLastItem = currentPage * 20;
  const indexOfFirstItem = indexOfLastItem - 20;

  const paginatedData =
    search && searchFilter.name !== ""
      ? sortedInventory?.filter((item) =>
          item[searchFilter.name].toLowerCase().startsWith(search)
        )
      : sortedInventory?.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = paginate(20, inventory?.length);

  const onNewSubmit = async (values) => {
    // update values to add dateReturn
    values.purchaseDate = startDate.toISOString();

    await axios
      .post(`${links.default}/inventory/new`, values)
      .then((res) => {
        setShowNew(false);
        setInventory((prevState) => [...prevState, res?.data]);
        toast.success("added successfully");
      })
      .catch((err) => toast.error("failed, something went wrong"));
  };

  const handleUpdate = async (values) => {
    const updatedInventory = inventory.map((item) =>
      item._id === values._id
        ? {
            ...item,
            propertyNumber: values.propertyNumber,
            equipment: values.equipment,
            receiveBy: values.receiveBy,
            qty: values.qty,
            _id: values._id,
          }
        : item
    );
    setInventory(updatedInventory);
    if (selectedItems.length > 1) return;
    axios
      .put(`${links.default}/inventory/update/${values._id}`, values)
      .then((res) => {
        toast.success(res.data.message);
        setSelectedItems([]);
        setSelectedQr([]);
        setShowEdit(false);
      })
      .catch((err) => toast.error("failed, something went wrong"));
  };

  const handleDelete = async () => {
    const toDelete = selectedItems.map((item) => item._id);
    // update db
    await axios
      .post(`${links.default}/inventory/delete/multiple`, { toDelete })
      .then((res) => {
        toast.success(res.data.message);
        setSelectedItems([]);
        setSelectedQr([]);
      })
      .catch((err) => toast.error("failed, something went wrong"));
    let inventoryCopy = [...inventory];
    inventoryCopy = inventoryCopy.filter(
      (item) => !selectedItems.some((s) => s._id === item._id)
    );
    setInventory(inventoryCopy);
  };

  useEffect(() => {
    let ready = true;
    if (ready) fetchInventory().then((res) => setInventory(res.data));
    return () => {
      ready = false;
    };
  }, []);

  return (
    <>
      <div className="p-5 h-screen flex flex-col">
        <h1 className="font-semibold text-4xl text-gray-800">Inventory</h1>

        <TableMenu
          showQr={showQr}
          search={search}
          startDate={startDate}
          setStartDate={setStartDate}
          showNew={showNew}
          setShowQr={setShowQr}
          setShowEdit={setShowEdit}
          setSearch={setSearch}
          setShowNew={setShowNew}
          selectedQr={selectedQr}
          onNewSubmit={onNewSubmit}
          searchFilter={searchFilter}
          handleDelete={handleDelete}
          selectedItems={selectedItems}
          setSearchFilter={setSearchFilter}
          type="inventory"
        />

        <TableComponentInventory
          inventory={paginatedData}
          selectAll={selectAll}
          setSelectAll={setSelectAll}
          selectedQr={selectedQr}
          handleUpdate={handleUpdate}
          setShowQr={setShowQr}
          showQr={showQr}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          setSelectedQr={setSelectedQr}
          activeTableHeader={activeTableHeader}
          setActiveTableHeader={setActiveTableHeader}
        />

        {inventory?.length > 5 && (
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

export default Inventory;
