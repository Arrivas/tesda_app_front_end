import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import FormikField from "../forms/FormikField";
import AppFormField from "../forms/AppFormField";
import SubmitButton from "../forms/SubmitButton";
import * as Yup from "yup";
import { Listbox } from "@headlessui/react";
import BorrowedSelect from "./BorrowedSelect";

const EditModal = ({ showEdit, setShowEdit, handleUpdate, selectedItems }) => {
  const [isBorrowed, setIsBorrowed] = useState({
    label: "borrowed",
    isBorrowed: selectedItems[0]?.isBorrowed,
  });

  const initialValues = {
    SSP: selectedItems[0]?.SSP,
    propertyNo: selectedItems[0]?.propertyNo,
    receivedBy: selectedItems[0]?.receivedBy,
    isBorrowed: isBorrowed.isBorrowed,
    _id: selectedItems[0]?._id,
  };

  const validationSchema = Yup.object({
    SSP: Yup.string().required("field must not be empty"),
    propertyNo: Yup.string().required("field must not be empty"),
    receivedBy: Yup.string().required("field must not be empty"),
  });

  return (
    <Dialog
      open={showEdit}
      onClose={() => setShowEdit(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded shadow-lg bg-white p-2">
          <div className="flex justify-between items-center">
            <Dialog.Title className="font-semibold">Edit</Dialog.Title>
            <button onClick={() => setShowEdit(false)}>
              <XMarkIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          {/* form */}
          <FormikField
            initialValues={initialValues}
            onSubmit={handleUpdate}
            validationSchema={validationSchema}
          >
            <div className="space-y-2 py-2">
              <AppFormField
                name="SSP"
                placeholder="SSP"
                fieldClass="text-black bg-gray-50"
                label="SSP"
              />
              <AppFormField
                name="propertyNo"
                placeholder="Property Number"
                fieldClass="text-black bg-gray-50"
                label="Property No"
              />
              <AppFormField
                name="receivedBy"
                placeholder="Received By"
                fieldClass="text-black bg-gray-50"
                label="Received By"
              />
              <div>
                <p className="font-semibold px-3 text-xs">Status</p>
                <BorrowedSelect
                  isBorrowed={isBorrowed}
                  setIsBorrowed={setIsBorrowed}
                />
              </div>
            </div>
            {/* buttons */}
            <div className="flex items-center space-x-2">
              <button
                className="w-full h-[40px] mt-[12px] hover:bg-gray-100 flex items-center justify-center rounded-md border border-gray-200 "
                onClick={() => setShowEdit(false)}
              >
                <p className={`text-[17px] font-semibold`}>cancel</p>
              </button>
              <SubmitButton title="save" />
            </div>
          </FormikField>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditModal;
