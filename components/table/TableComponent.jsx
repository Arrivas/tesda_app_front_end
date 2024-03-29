import React from "react";
import THeadComponent from "../../components/table/THeadComponent";
import moment from "moment";
import ShowQrModal from "../borrow/ShowQrModal";
import EditModal from "../borrow/EditModal";

const TableComponent = ({
  borrow,
  selectedItems,
  setSelectedItems,
  selectAll,
  setSelectAll,
  activeTableHeader,
  setActiveTableHeader,
  showQr,
  setShowQr,
  selectedQr,
  setSelectedQr,
  handleUpdate,
  showEdit,
  setShowEdit,
  selectedImage,
  setSelectedImage,
  setBorrow,
  activeTab,
}) => {
  const theadItems = [
    {
      id: 1,
      label: "input",
      input: (
        <input
          name="checkAll"
          type="checkbox"
          className="caret-transparent"
          checked={selectedItems.length !== 0 && selectAll ? true : false}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedItems(
                borrow.map((item) => {
                  return { ...item, selected: true };
                })
              );
              setSelectedQr(
                borrow.map((item) => {
                  return { id: item._id, propertyNo: item.propertyNo };
                })
              );
            } else {
              setSelectedQr([]);
              setSelectedItems([]);
            }
            setSelectAll(!selectAll);
          }}
        />
      ),
    },
    // { id: 2, label: "No." },
    { id: 3, label: "Property Number" },
    { id: 4, label: "Equipment" },
    { id: 5, label: "Qty" },
    { id: 6, label: "Name" },
    { id: 7, label: "Role" },
    { id: 8, label: "Location" },
    { id: 9, label: "Status" },
    { id: 10, label: "Condition" },
    { id: 11, label: "Timestamp" },
    { id: 12, label: "Return Date" },
  ];
  const newTheadItems = theadItems.filter(
    (item) => item.id !== 10 || activeTab === "Return"
  );
  const isDue = (date) => (new Date(`${date}`) < new Date() ? true : false);
  return (
    <div className="min-w-[300px] h-full overflow-y-scroll">
      <table className="table-fixed break-words h-screen md:h-auto w-full caret-transparent">
        <THeadComponent
          theadItems={newTheadItems}
          activeTableHeader={activeTableHeader}
          setActiveTableHeader={setActiveTableHeader}
        />
        <tbody>
          {borrow?.map((item, index) => (
            <tr key={item._id}>
              <td className="text-center py-4">
                <input
                  name="selected"
                  type="checkbox"
                  className=""
                  checked={selectedItems.some((s) => s._id === item._id)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const modifiedSelectedItem = {
                      ...item,
                      selected: isChecked,
                    };

                    const qrItem = {
                      id: item._id,
                      propertyNo: item.propertyNo,
                    };

                    setSelectedQr((prevSelectedItems) => {
                      if (isChecked) {
                        return [...prevSelectedItems, qrItem];
                      } else {
                        return prevSelectedItems.filter(
                          (s) => s.id !== item._id
                        );
                      }
                    });

                    setSelectedItems((prevSelectedItems) => {
                      if (isChecked) {
                        return [...prevSelectedItems, modifiedSelectedItem];
                      } else {
                        return prevSelectedItems.filter(
                          (s) => s._id !== item._id
                        );
                      }
                    });
                    setSelectAll(false);
                  }}
                />
              </td>
              {/* <td className="w-[4%]">{index + 1}</td> */}
              <td className="min-w-[220px] ">{item.propertyNo}</td>
              <td className="min-w-[220px] md:min-w-auto md:w-100%">
                {item.equipment}
              </td>
              <td className="min-w-[100px]">{item.qty}</td>
              <td className="min-w-[220px] md:min-w-auto md:w-100%">
                {item.fullName}
              </td>
              <td className="min-w-[220px] md:min-w-auto md:w-100%">
                {item.role}
              </td>
              <td
                title={item.location === "Inside" ? "on-site" : "off-site"}
                className="min-w-[220px] md:min-w-auto md:w-100%"
              >
                {item.location}
              </td>
              <td className="min-w-[80px] md:min-w-auto md:w-100%">
                <span
                  className={`${
                    isDue(item.dateReturn) && item.isBorrowed
                      ? "text-[#bf807f] bg-[#ffe0e1]"
                      : item.isBorrowed
                      ? "text-[#ffbd44] bg-[#ffbe4459]"
                      : "text-[#63a878] bg-[#e0ffeb]"
                  } p-2 text-xs font-bold rounded-md`}
                >
                  {isDue(item.dateReturn) && item.isBorrowed
                    ? "past due"
                    : item.isBorrowed
                    ? "borrowed"
                    : "returned"}
                </span>
              </td>

              {activeTab === "Return" ? (
                <td className="md:min-w-auto md:w-100%">{item.condition}</td>
              ) : null}
              <td className="min-w-[120px] md:min-w-auto md:w-100% ">
                <span className="text-gray-500 text-xs">
                  {moment(new Date(item.createdAt)).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                </span>
              </td>
              <td>
                {" "}
                <span className="text-gray-500 text-xs">
                  {moment(new Date(item.dateReturn)).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                </span>
              </td>
              <td className="hidden">
                <ShowQrModal
                  showQr={showQr}
                  setShowQr={setShowQr}
                  selectedQr={selectedQr}
                />

                {selectedItems[0]?._id === item._id && (
                  <EditModal
                    borrow={borrow}
                    setBorrow={setBorrow}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    items={item}
                    showEdit={showEdit}
                    setShowEdit={setShowEdit}
                    handleUpdate={handleUpdate}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
