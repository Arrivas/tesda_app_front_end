import React from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ShowQrModal = ({ showQr, setShowQr, qrValue }) => {
  return (
    <Dialog
      open={showQr}
      onClose={() => setShowQr(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded shadow-lg bg-white p-2">
          <div className="flex justify-between items-center">
            <Dialog.Title className="font-semibold">QR Code</Dialog.Title>
            <button onClick={() => setShowQr(false)}>
              <XMarkIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          {/* form */}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ShowQrModal;
