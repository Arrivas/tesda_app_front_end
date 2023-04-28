import React from "react";
import { Dialog } from "@headlessui/react";

const ShowTimeStamp = ({ showTimeStamp, setShowTimeStamp }) => {
  return (
    <Dialog
      open={showTimeStamp}
      onClose={() => setShowTimeStamp(false)}
      className="relative z-50"
    >
      {/* <div className="fixed inset-0 bg-black/30" aria-hidden="true" /> */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-black">
          <Dialog.Title className="text-white">Complete Timestamp</Dialog.Title>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ShowTimeStamp;

{
  /* <Dialog
open={showTimeStamp}
onClose={() => setShowTimeStamp(false)}
className="relative z-50"
>
<div className="fixed inset-0 flex items-center justify-center p-4">
  <Dialog.Panel className="w-full max-w-sm rounded bg-black">
    <Dialog.Title className="text-white">
      Complete your order
    </Dialog.Title>

  </Dialog.Panel>
</div>
</Dialog> */
}
