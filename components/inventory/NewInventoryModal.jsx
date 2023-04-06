import React from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import FormikField from "../forms/FormikField";
import AppFormField from "../forms/AppFormField";
import SubmitButton from "../forms/SubmitButton";
import * as Yup from "yup";
import moment from "moment";
import DatePickerField from "../forms/DatePickerField";
import UploadImage from "../forms/UploadImage";

const NewInventoryModal = ({
  showNew,
  setShowNew,
  onNewSubmit,
  startDate,
  setStartDate,
  selectedImage,
  setSelectedImage,
}) => {
  const initialValues = {
    propertyNo: "",
    equipment: "",
    qty: 1,
    receiveBy: "",
  };

  const validationSchema = Yup.object({
    propertyNo: Yup.string().required("field must not be empty"),
    equipment: Yup.string().required("field must not be empty"),
    qty: Yup.number().required("field must not be empty"),
    receiveBy: Yup.string().required("field must not be empty"),
  });

  return (
    <Dialog
      open={showNew}
      onClose={() => setShowNew(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center ">
        <Dialog.Panel className="w-full max-w-3xl  rounded shadow-lg bg-white p-4">
          <div className="flex justify-between items-center">
            <Dialog.Title className="font-semibold px-3">
              New Borrow
            </Dialog.Title>
            <button onClick={() => setShowNew(false)}>
              <XMarkIcon className="w-5 h-5 text-gray-400 " />
            </button>
          </div>
          {/* form */}
          <FormikField
            initialValues={initialValues}
            onSubmit={onNewSubmit}
            validationSchema={validationSchema}
          >
            <div className="space-y-2 py-2 overflow-y-auto px-3 h-[350px]">
              <AppFormField
                name="propertyNo"
                placeholder="Property Number"
                label="Property Number"
                fieldClass="text-black bg-gray-50"
              />

              <AppFormField
                name="equipment"
                placeholder="Equipment"
                label="Equipment"
                fieldClass="text-black bg-gray-50"
              />
              <AppFormField
                name="qty"
                placeholder="Qty"
                label="Qty"
                fieldClass="text-black bg-gray-50"
              />
              <AppFormField
                name="receiveBy"
                placeholder="Receive By"
                label="Receive By"
                fieldClass="text-black bg-gray-50"
              />

              {/* purchaseDate*/}
              <div className="flex items-center w-full space-x-2">
                <DatePickerField
                  label="Return Date"
                  startDate={startDate}
                  setStartDate={setStartDate}
                  type="inventory"
                />
                <div className="flex flex-col flex-1 py-2">
                  <span className="font-semibold text-xs">Purchase Date</span>
                  <span>{moment(startDate).format("LLLL")}</span>
                </div>
              </div>
              {/* upload image */}
              <UploadImage
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
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

export default NewInventoryModal;
