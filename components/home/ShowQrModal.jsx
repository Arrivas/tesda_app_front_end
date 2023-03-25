import React, { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon, PrinterIcon } from "@heroicons/react/24/solid";
import QRCode from "react-qr-code";

const ShowQrModal = ({ showQr, setShowQr, selectedQr }) => {
  const qrCodeRef = useRef(null);

  const handlePrint = () => {
    const qrCodeDivs = Array.from(
      qrCodeRef.current.querySelectorAll(".flex.items-center.flex-col")
    );
    let windowContent = "<!DOCTYPE html>";
    const printContent = `
      <html>
        <head>
          <title>QR Codes</title>
        </head>
        <body>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
            ${qrCodeDivs
              .map(
                (div) => `
                <div style="display: flex; flex-direction: column; align-items: center;">
                  ${div.innerHTML}
                </div>
              `
              )
              .join("")}
          </div>
        </body>
      </html>
    `;
    windowContent += printContent;
    const printWindow = window.open("", "", "height=500,width=800");
    printWindow.document.write(windowContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  return (
    <Dialog
      open={showQr}
      onClose={() => setShowQr(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/10" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4 ">
        <Dialog.Panel
          className="w-full max-w-lg rounded bg-white p-2"
          ref={qrCodeRef}
        >
          <div className="flex justify-between items-center overflowy-auto">
            <Dialog.Title className="font-semibold">QR Code</Dialog.Title>
            <button
              className="dialog-close-button"
              onClick={() => setShowQr(false)}
            >
              <XMarkIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-3">
            {selectedQr.map((item) => (
              <div className="flex items-center flex-col p-1" key={item.id}>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "40%" }}
                  value={item.id}
                  viewBox={`0 0 256 256`}
                />
                <p>{item.propertyNo}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="w-full h-[40px] mt-[12px] hover:bg-gray-100 flex items-center justify-center rounded-md border border-gray-200 "
              onClick={() => setShowQr(!showQr)}
            >
              <p className={`text-[17px] font-semibold`}>cancel</p>
            </button>
            <button
              className="w-full h-[40px] mt-[12px] hover:bg-[#2c5093] bg-[#203a6b] flex items-center justify-center rounded-md border border-gray-200 "
              onClick={handlePrint}
            >
              <PrinterIcon className="h-4 w-4 text-white" />
              <p className={`text-[17px] font-semibold text-white`}>print</p>
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ShowQrModal;
