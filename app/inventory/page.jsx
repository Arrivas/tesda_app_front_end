"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import links from "../../config/links";
import { toast } from "react-hot-toast";
import paginate from "../../helper/paginate";
import sortBorrow from "../../helper/sortBorrow";
import Pagination from "../../components/pagination/Pagination";
import TableMenu from "../../components/borrow/TableMenu";
import TableComponentInventory from "../../components/table/TableComponentInventory";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const conditionItems = [
  { id: 1, label: "Serviceable" },
  { id: 2, label: "Unserviceable" },
];

const unitItems = [
  { id: 1, label: "pc/s" },
  { id: 2, label: "set/s" },
];

const Inventory = () => {
  const user = useSelector((state) => state.user);
  const [inventory, setInventory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeTableHeader, setActiveTableHeader] = useState({
    active: "Purchase Date",
    sort: "desc",
  });
  const [docType, setDocType] = useState({
    label: "SSP",
    value: "ssp",
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTab, setSelectedTab] = useState("SSP");
  const [classification, setClassification] = useState("Semi-Expendable");
  const [amount, setAmount] = useState(0);
  const [condition, setCondition] = useState({ id: 1, label: "Serviceable" });
  const [unit, setUnit] = useState(unitItems[0]);

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
          item[searchFilter.name].toLowerCase().includes(search)
        )
      : selectedTab === "SSP"
      ? sortedInventory
          ?.filter((item) => item.docType === "ssp")
          ?.slice(indexOfFirstItem, indexOfLastItem)
      : sortedInventory
          ?.filter((item) => item.docType === "101")
          ?.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = paginate(20, inventory?.length);

  const onNewSubmit = async (values) => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    const imagePromise = selectedImage
      ? axios
          .post(`${links.default}/images/upload`, formData)
          .then((res) => {
            if (res.status !== 200) {
              throw new Error("failed, something went wrong");
            }
            return res.data?.image;
          })
          .catch((err) => {
            throw new Error("failed, something went wrong");
          })
      : Promise.resolve(null);

    const image = await imagePromise;
    values.purchaseDate = startDate.toISOString();
    values.image = image;
    values.docType = docType.value;
    values.amount = Number(amount);
    values.classification = classification;
    values.condition = condition.label;
    values.unit = unit.label;
    await axios
      .post(`${links.default}/inventory/new`, values)
      .then((res) => {
        setShowNew(false);
        setInventory((prevState) => [...prevState, res?.data]);
        setSelectedImage(null);
        toast.success("added successfully");
      })
      .catch((err) => {
        if (err.request.status === 400)
          return toast.error(err?.response?.data?.message);
        toast.error("failed, something went wrong");
      });
  };

  const handleUpdate = async (values) => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    const imagePromise = selectedImage
      ? axios
          .post(
            `${links.default}/images/upload/edit/${
              values?.image?._id || "642dd2d246c980d34b9346b1"
            }`,
            formData
          )
          .then((res) => {
            if (res.status !== 200) {
              throw new Error("failed, something went wrong");
            }
            return res.data?.image;
          })
          .catch((err) => {
            throw new Error("failed, something went wrong");
          })
      : Promise.resolve(null);

    const image = await imagePromise;
    const updatedInventory = inventory.map((item) =>
      item._id === values._id
        ? {
            ...item,
            propertyNumber: values.propertyNumber,
            equipment: values.equipment,
            receiveBy: values.receiveBy,
            image: image || values.image,
            purchaseDate: values.purchaseDate,
            qty: values.qty,
            docType: docType.value,
            amount: values.amount,
            classification: values.classification,
            _id: values._id,
            condition: values.condition,
            unit: values.unit,
          }
        : item
    );
    setInventory(updatedInventory);
    values.image = image || values.image;
    if (selectedItems.length > 1) return;
    axios
      .put(`${links.default}/inventory/update/${values._id}`, values)
      .then((res) => {
        toast.success(res.data.message);
        setSelectedItems([]);
        setSelectedQr([]);
        setShowEdit(false);
        setSelectedImage(null);
      })
      .catch((err) => toast.error("failed, something went wrong"));
  };

  const handleDelete = async () => {
    const toDelete = [];
    const toDeleteImg = [];
    selectedItems.map((item) => {
      toDelete.push(item._id);
      if (item?.image) {
        toDeleteImg.push(item.image._id);
      } else {
        return;
      }
    });
    // update db
    await axios
      .post(`${links.default}/inventory/delete/multiple`, {
        toDelete,
        toDeleteImg,
      })
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

  if (!user.user) return <Loading />;

  const tabItems = [
    { id: 1, label: "SSP" },
    { id: 2, label: "101" },
  ];

  return (
    <>
      <div className="p-5 h-screen flex flex-col">
        <div className="flex flex-row space-x-4">
          {tabItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedItems([]);
                setSelectedQr([]);
                setSelectedTab(selectedTab === "SSP" ? "101" : "SSP");
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

        <TableMenu
          unitItems={unitItems}
          unit={unit}
          setUnit={setUnit}
          amount={amount}
          setAmount={setAmount}
          classification={classification}
          setClassification={setClassification}
          showQr={showQr}
          search={search}
          type="inventory"
          condition={condition}
          setCondition={setCondition}
          conditionItems={conditionItems}
          docType={docType}
          showNew={showNew}
          startDate={startDate}
          setShowQr={setShowQr}
          setSearch={setSearch}
          setDocType={setDocType}
          setShowNew={setShowNew}
          selectedQr={selectedQr}
          setShowEdit={setShowEdit}
          onNewSubmit={onNewSubmit}
          setStartDate={setStartDate}
          searchFilter={searchFilter}
          handleDelete={handleDelete}
          selectedImage={selectedImage}
          selectedItems={selectedItems}
          setSearchFilter={setSearchFilter}
          setSelectedImage={setSelectedImage}
        />

        <TableComponentInventory
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
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
          setInventory={setInventory}
        />

        {inventory?.length > 20 && (
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
