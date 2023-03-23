import React from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import FormikField from "../forms/FormikField";
import AppFormField from "../forms/AppFormField";
import SubmitButton from "../forms/SubmitButton";
import * as Yup from "yup";

const NewBorrowModal = ({ showNew, setShowNew }) => {
  const initialValues = {
    SSP: "",
    propertyNumber: "",
    receivedBy: "",
    isBorrowed: false,
  };

  const validationSchema = Yup.object({
    SSP: Yup.string().required("field must not be empty"),
    propertyNumber: Yup.string().required("field must not be empty"),
    receivedBy: Yup.string().required("field must not be empty"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Dialog
      open={showNew}
      onClose={() => setShowNew(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded shadow-lg bg-white p-2">
          <div className="flex justify-between items-center">
            <Dialog.Title className="font-semibold">New Borrow</Dialog.Title>
            <button onClick={() => setShowNew(false)}>
              <XMarkIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          {/* form */}
          <FormikField
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <div className="space-y-2 py-2">
              <AppFormField
                name="SSP"
                placeholder="SSP"
                fieldClass="text-black bg-gray-50"
              />
              <AppFormField
                name="propertyNumber"
                placeholder="Property Number"
                fieldClass="text-black bg-gray-50"
              />
              <AppFormField
                name="receivedBy"
                placeholder="Received By"
                fieldClass="text-black bg-gray-50"
              />
            </div>
            {/* buttons */}
            <div className="flex items-center space-x-2">
              <button
                className="w-full h-[40px] mt-[12px] hover:bg-gray-100 flex items-center justify-center rounded-md border border-gray-200 "
                onClick={() => setShowNew(false)}
              >
                <p className={`text-[17px] font-semibold`}>cancel</p>
              </button>
              <SubmitButton title="create" />
            </div>
          </FormikField>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default NewBorrowModal;
