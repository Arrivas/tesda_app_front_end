import React from "react";
import THeadComponent from "./THeadComponent";
import ShowQrModal from "../home/ShowQrModal";
import moment from "moment";
import EditModal from "../inventory/EditModal";

const TableComponentInventory = ({
  inventory,
  setInventory,
  setSelectedItems,
  setSelectedQr,
  selectedItems,
  activeTableHeader,
  setActiveTableHeader,
  showQr,
  setShowQr,
  selectedQr,
  showEdit,
  setShowEdit,
  handleUpdate,
  selectAll,
  setSelectAll,
  selectedImage,
  setSelectedImage,
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
                inventory.map((item) => {
                  return { ...item, selected: true };
                })
              );
              setSelectedQr(
                inventory.map((item) => {
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
    { id: 3, label: "Property Number" },
    { id: 4, label: "Equipment" },
    { id: 5, label: "Receive By" },
    { id: 6, label: "Qty" },
    { id: 7, label: "Purchase Date" },
  ];
  return (
    <>
      <div className="min-w-[300px] h-full overflow-y-scroll">
        <table className="table-fixed break-words h-screen md:h-auto w-full caret-transparent">
          <THeadComponent
            theadItems={theadItems}
            activeTableHeader={activeTableHeader}
            setActiveTableHeader={setActiveTableHeader}
          />
          <tbody>
            {inventory?.map((item) => (
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
                <td className="min-w-[100px]">{item.receiveBy}</td>
                <td className="min-w-[100px]">{item.qty}</td>
                <td className="min-w-[120px] md:min-w-auto md:w-100%">
                  <span className="text-gray-500 text-xs">
                    {moment(new Date(item.purchaseDate)).format(
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
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                      items={item}
                      showEdit={showEdit}
                      setShowEdit={setShowEdit}
                      handleUpdate={handleUpdate}
                      inventory={inventory}
                      setInventory={setInventory}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableComponentInventory;
