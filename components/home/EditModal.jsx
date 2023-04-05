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
import UploadImage from "../forms/UploadImage";

const EditModal = ({
  showEdit,
  setShowEdit,
  handleUpdate,
  items,
  selectedImage,
  setSelectedImage,
}) => {
  const [isBorrowed, setIsBorrowed] = useState({
    label: items.isBorrowed ? "borrowed" : "returned",
    isBorrowed: items.isBorrowed,
  });
  const [location, setLocation] = useState({
    id: 1,
    label: items.location,
  });
  const [role, setRole] = useState({ id: 1, label: items.role });

  const [condition, setCondition] = useState({
    id: 1,
    label: items.condition,
  });
  const [startDate, setStartDate] = useState(new Date(items?.dateReturn));

  const locationItems = [
    { id: 1, label: "Inside" },
    { id: 2, label: "Outside" },
  ];

  const roleItems = [
    { id: 1, label: "Trainee" },
    { id: 2, label: "Trainor" },
    { id: 3, label: "Admin Staff" },
  ];

  const conditionItems = [
    { id: 1, label: "Serviceable" },
    { id: 2, label: "Unserviceable" },
  ];

  const borrowedItems = [
    { id: 1, label: "borrowed", isBorrowed: true },
    { id: 2, label: "returned", isBorrowed: false },
  ];

  const initialValues = {
    propertyNo: items?.propertyNo,
    fullName: items?.fullName,
    address: items?.address,
    contactNumber: items?.contactNumber,
    equipment: items?.equipment,
    qty: items?.qty,
    purpose: items?.purpose,
    condition: condition?.label,
    role: role?.label,
    location: location?.label,
    dateReturn: startDate.toISOString(),
    isBorrowed: isBorrowed?.isBorrowed,
    specificLocation: items?.specificLocation,
    image: items?.image,
    _id: items?._id,
  };

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
    purpose: Yup.string().required("field must not be empty"),
  });

  return (
    <Dialog
      open={showEdit}
      onClose={() => setShowEdit(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-3xl  rounded shadow-lg bg-white p-4">
          <div className="flex justify-between items-center">
            <Dialog.Title className="font-semibold px-3">Edit</Dialog.Title>
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
            <div className="space-y-2 py-2 overflow-y-auto px-3 h-[350px]">
              <AppFormField
                name="propertyNo"
                placeholder="Property Number"
                label="Property Number"
                fieldClass="text-black bg-gray-50"
              />
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
                <AppFormField
                  name="purpose"
                  placeholder="Purpose"
                  label="Purpose"
                  fieldClass="text-black bg-gray-50"
                />
                <SelectForm
                  select={condition}
                  label="Condition"
                  selectItems={conditionItems}
                  onSetSelect={setCondition}
                />
              </div>

              <div className="flex items-center space-x-2">
                <SelectForm
                  select={role}
                  label="Role"
                  selectItems={roleItems}
                  onSetSelect={setRole}
                />
                <SelectForm
                  select={location}
                  label="Location"
                  selectItems={locationItems}
                  onSetSelect={setLocation}
                />
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
              <SelectForm
                selectItems={borrowedItems}
                onSetSelect={setIsBorrowed}
                select={isBorrowed}
                label="Status"
              />
              <div className="flex items-center w-full space-x-2">
                <DatePickerField
                  label="Return Date"
                  startDate={startDate}
                  setStartDate={setStartDate}
                />
                <div className="flex flex-col flex-1 py-2 justify-end">
                  <span className="font-semibold text-xs">
                    Date & Time of Return
                  </span>
                  <span>{moment(startDate).format("LLLL")}</span>
                </div>
              </div>

              {/* image */}
              <UploadImage
                type="inventory"
                prevImage={items?.image}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
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
