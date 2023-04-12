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
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import Head from "next/head";

const Home = () => {
  const user = useSelector((state) => state.user);
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
  const [showEdit, setShowEdit] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(null);
  const [location, setLocation] = useState({ id: 1, label: "Inside" });
  const [role, setRole] = useState({ id: 1, label: "Trainee" });
  const [condition, setCondition] = useState({ id: 1, label: "Serviceable" });

  const locationItems = [
    { id: 1, label: "Inside" },
    { id: 2, label: "Outside" },
  ];

  const roleItems = [
    { id: 1, label: "Trainee" },
    { id: 2, label: "Trainor" },
    { id: 3, label: "Admin Staff" },
  ];

  const conditionItems = [
    { id: 1, label: "Serviceable" },
    { id: 2, label: "Unserviceable" },
  ];

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
    if (ready) fetchBorrow().then((res) => setBorrow(res?.data));
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
    const dateReturn = startDate.toISOString();
    const data = {
      ...values,
      dateReturn,
      location: location.label,
      role: role.label,
      condition: condition.label,
      image,
    };

    try {
      const res = await axios.post(`${links.default}/borrow/new`, data);
      setShowNew(false);
      setBorrow((prevState) => [...prevState, res.data]);
      setSelectedImage(null);
      toast.success("added successfully");
    } catch (err) {
      toast.error("failed, something went wrong");
    }
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
    const updatedBorrow = borrow.map((item) =>
      item._id === values._id
        ? {
            ...item,
            address: values.address,
            condition: values.condition,
            contactNumber: values.contactNumber,
            dateReturn: values.dateReturn,
            equipment: values.equipment,
            fullName: values.fullName,
            isBorrowed: values.isBorrowed,
            location: values.location,
            specificLocation: values.specificLocation,
            propertyNo: values.propertyNo,
            purpose: values.purpose,
            qty: values.qty,
            role: values.role,
            image: image ? image : values.image,
            _id: values._id,
          }
        : item
    );
    setBorrow(updatedBorrow);
    values.image = image || values.image;
    if (selectedItems.length > 1) return;
    axios
      .put(`${links.default}/borrow/update/${values._id}`, values)
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
      .post(`${links.default}/borrow/delete/multiple`, {
        toDelete,
        toDeleteImg,
      })
      .then((res) => {
        toast.success(res.data.message);
        setSelectedItems([]);
        setSelectedQr([]);
      })
      .catch((err) => toast.error("failed, something went wrong"));
    let borrowCopy = [...borrow];
    borrowCopy = borrowCopy.filter(
      (item) => !selectedItems.some((s) => s._id === item._id)
    );
    setBorrow(borrowCopy);
  };

  if (!user.user) return <Loading />;
  return (
    <>
      <div className="p-5 h-screen flex flex-col">
        <h1 className="font-semibold text-4xl text-gray-800">Borrow</h1>
        {/* table menu */}

        <TableMenu
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          borrow={borrow}
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
          location={location}
          setLocation={setLocation}
          role={role}
          setRole={setRole}
          condition={condition}
          setCondition={setCondition}
          conditionItems={conditionItems}
          roleItems={roleItems}
          locationItems={locationItems}
        />

        <TableComponent
          setBorrow={setBorrow}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          showQr={showQr}
          setShowQr={setShowQr}
          selectAll={selectAll}
          setSelectAll={setSelectAll}
          borrow={paginatedData}
          selectedQr={selectedQr}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          handleUpdate={handleUpdate}
          selectedItems={selectedItems}
          setSelectedQr={setSelectedQr}
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
