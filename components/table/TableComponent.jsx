import React from "react";
import THeadComponent from "@/components/table/THeadComponent";
import moment from "moment";
import ShowQrModal from "../home/ShowQrModal";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import EditModal from "../home/EditModal";

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
}) => {
  const theadItems = [
    {
      id: 1,
      label: "input",
      input: (
        <input
          name="checkAll"
          type="checkbox"
          className=""
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
    { id: 8, label: "Status" },
    { id: 9, label: "Timestamp" },
    { id: 10, label: "" },
  ];

  return (
    <div className="min-w-[300px] h-full overflow-y-scroll">
      <table className="table-fixed break-words h-screen md:h-auto w-full">
        <THeadComponent
          theadItems={theadItems}
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
              <td className="min-w-[80px] md:min-w-auto md:w-100%">
                <span
                  className={`${
                    item.isBorrowed
                      ? "text-[#bf807f] bg-[#ffe0e1]"
                      : " text-[#63a878] bg-[#e0ffeb]"
                  } p-2 text-xs font-bold rounded-md`}
                >
                  {item.isBorrowed ? "borrowed" : "returned"}
                </span>
              </td>
              <td className="min-w-[120px] md:min-w-auto md:w-100%">
                <span className="text-gray-500 text-xs">
                  {moment(new Date(item.createdAt)).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                </span>
              </td>
              <td className="min-w-[120px] min-h-[120px] md:min-w-auto md:w-100%">
                <button className="hover:bg-gray-200 rounded-full">
                  <EllipsisHorizontalIcon height={20} width={20} />
                </button>
              </td>

              <ShowQrModal
                showQr={showQr}
                setShowQr={setShowQr}
                selectedQr={selectedQr}
              />
              <EditModal
                items={item}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                handleUpdate={handleUpdate}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
