import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import FormikField from "../forms/FormikField";
import AppFormField from "../forms/AppFormField";
import SubmitButton from "../forms/SubmitButton";
import * as Yup from "yup";
import SelectForm from "../forms/SelectForm";
import DatePickerField from "../forms/DatePickerField";
import moment from "moment";
import DebounceInput from "./DebounceInput";

const NewBorrowModal = ({
  showNew,
  setShowNew,
  onNewSubmit,
  startDate,
  setStartDate,
  location,
  setLocation,
  role,
  setRole,
  roleItems,
  locationItems,
  intention,
  setIntention,
  intentionItems,
}) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    propertyNo: Yup.string().required("field must not be empty"),
    fullName: Yup.string().required("field must not be empty"),
    address: Yup.string().required("field must not be empty"),
    contactNumber: Yup.string()
      .matches(phoneRegExp, "must be a valid phone number 09xxxxxxxxx")
      .min(11, "too short")
      .max(11, "too long")
      .required(),
    equipment: Yup.string().required("field must not be empty"),
    qty: Yup.number().required("field must not be empty"),
    specificLocation: Yup.string(),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  const initialValues = {
    propertyNo: selectedResult?.propertyNo || "",
    fullName: "",
    address: "",
    contactNumber: "",
    equipment: selectedResult?.equipment || "",
    qty: 0,
    purpose: "",
    specificLocation: "",
    isBorrowed: true,
  };

  return (
    <Dialog
      open={showNew}
      onClose={() => {
        setSelectedResult(null);
        setSearchResults([]);
        setShowNew(false);
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center ">
        <Dialog.Panel className="w-full max-w-3xl  rounded shadow-lg bg-white p-4">
          <div className="flex justify-between items-center">
            <Dialog.Title className="font-semibold px-3">
              Add New Borrow
            </Dialog.Title>
            <button
              onClick={() => {
                setSelectedResult(null);
                setSearchResults([]);
                setShowNew(false);
              }}
            >
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
              <div className="flex items-center space-x-2">
                <DebounceInput
                  selectedResult={selectedResult}
                  setSelectedResult={setSelectedResult}
                  searchResults={searchResults}
                  searchTerm={searchTerm}
                  setSearchResults={setSearchResults}
                  setSearchTerm={setSearchTerm}
                />
              </div>

              <div className="flex items-center space-x-2">
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
              </div>

              <div className="flex items-center space-x-2">
                <SelectForm
                  label="Intention"
                  select={intention}
                  selectItems={intentionItems}
                  onSetSelect={setIntention}
                />
              </div>

              <SelectForm
                select={role}
                label="Role"
                selectItems={roleItems}
                onSetSelect={setRole}
              />
              <div className="flex items-center space-x-2">
                <SelectForm
                  select={location}
                  label="Location"
                  selectItems={locationItems}
                  onSetSelect={setLocation}
                />
                {location.label === "Outside" && (
                  <AppFormField
                    name="specificLocation"
                    placeholder="Location(specific)"
                    label="Location(specific)"
                    fieldClass="text-black bg-gray-50"
                  />
                )}
              </div>

              <AppFormField
                name="fullName"
                placeholder="Full Name"
                label="Full Name"
                fieldClass="text-black bg-gray-50"
              />

              <div className="flex items-center space-x-2">
                <AppFormField
                  name="address"
                  placeholder="Address"
                  label="Address"
                  fieldClass="text-black bg-gray-50"
                />
                <AppFormField
                  name="contactNumber"
                  placeholder="Contact Number"
                  label="Contact Number"
                  fieldClass="text-black bg-gray-50"
                />
              </div>

              {/* date return */}
              <div className="flex items-center w-full space-x-2">
                <DatePickerField
                  label="Return Date"
                  startDate={startDate}
                  setStartDate={setStartDate}
                />
                <div className="flex flex-col flex-1 py-2">
                  <span className="font-semibold text-xs">
                    Date & Time of Return
                  </span>
                  <span>{moment(startDate).format("LLLL")}</span>
                </div>
              </div>
              {/* image */}
              {/* <UploadImage
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              /> */}
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
