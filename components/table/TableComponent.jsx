import React from "react";
import THeadComponent from "@/components/table/THeadComponent";
import moment from "moment";
import ShowTimeStamp from "../home/ShowTimeStamp";
import { QrCodeIcon } from "@heroicons/react/24/solid";
import QRCode from "react-qr-code";
import ShowQrModal from "../home/ShowQrModal";

const TableComponent = ({
  borrow,
  selectedItems,
  setSelectedItems,
  selectAll,
  setSelectAll,
  setShowTimeStamp,
  showTimeStamp,
  activeTableHeader,
  setActiveTableHeader,
  showQr,
  setShowQr,
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
            } else setSelectedItems([]);
            setSelectAll(!selectAll);
          }}
        />
      ),
    },
    { id: 2, label: "No." },
    { id: 3, label: "SSP" },
    { id: 4, label: "Property Number" },
    { id: 5, label: "Received By" },
    { id: 6, label: "Status" },
    { id: 7, label: "Timestamp" },
    { id: 8, label: "QR Code" },
  ];

  return (
    <div className="overflow-x-auto overflow-hidden min-w-[300px]">
      <table className="w-[400px] min-w-full table-fixed break-words">
        <THeadComponent
          theadItems={theadItems}
          activeTableHeader={activeTableHeader}
          setActiveTableHeader={setActiveTableHeader}
        />
        <tbody>
          {borrow?.map((item, index) => (
            <tr key={item._id}>
              <td className="text-center py-2">
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
              <td className="w-[4%]">{index + 1}</td>
              <td className="min-w-[220px] ">{item.SSP}</td>
              <td className="min-w-[220px] md:min-w-auto md:w-100%">
                {item.propertyNo}
              </td>
              <td className="min-w-[220px] md:min-w-auto md:w-100%">
                {item.receivedBy}
              </td>
              <td className="min-w-[80px] md:min-w-auto md:w-100%">
                <span
                  className={`${
                    item.isBorrowed
                      ? "text-[#bf807f] bg-[#ffe0e1]"
                      : "text-[#63a878] bg-[#e0ffeb]"
                  } p-2 text-xs font-bold rounded-md`}
                >
                  {item.isBorrowed ? "borrowed" : "returned"}
                </span>
              </td>
              <td className="min-w-[120px] md:min-w-auto md:w-100%">
                <button onClick={() => setShowTimeStamp(!showTimeStamp)}>
                  <span className="text-gray-500 text-xs underline">
                    {moment(new Date(item.createdAt)).format(
                      "MMMM Do YYYY, h:mm a"
                    )}
                  </span>
                </button>
              </td>
              <td className="min-w-[120px] md:min-w-auto md:w-100%">
                <button
                  className="flex items-center"
                  onClick={() => setShowQr(!showQr)}
                >
                  <QrCodeIcon className="w-5 h-5" />
                  <span className="text-gray-500 text-xs">show qr</span>
                </button>
              </td>
              <ShowTimeStamp
                setShowTimeStamp={setShowTimeStamp}
                showTimeStamp={showTimeStamp}
              />
              <ShowQrModal
                showQr={showQr}
                setShowQr={setShowQr}
                qrValue={item._id}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
