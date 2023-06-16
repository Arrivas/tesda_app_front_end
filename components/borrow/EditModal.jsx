import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import FormikField from "../forms/FormikField";
import AppFormField from "../forms/AppFormField";
import SubmitButton from "../forms/SubmitButton";
import * as Yup from "yup";
import SelectForm from "../forms/SelectForm";
import DatePickerField from "../forms/DatePickerField";
import moment from "moment";
import axios from "axios";
import links from "../../config/links";
import SelectComponent from "./SelectComponent";

const locationItems = [
  { id: 1, label: "Inside" },
  { id: 2, label: "Outside" },
];

const roleItems = [
  { id: 1, label: "Trainee" },
  { id: 2, label: "Trainer" },
  { id: 3, label: "Admin Staff" },
];

const borrowedItems = [
  { id: 1, label: "borrowed", isBorrowed: true },
  { id: 2, label: "returned", isBorrowed: false },
];

const purposeItems = [
  { id: 1, label: "Training" },
  { id: 2, label: "Event" },
  { id: 3, label: "Meeting" },
  { id: 4, label: "Lecture" },
  { id: 5, label: "Office Staff purposes" },
];

const EditModal = ({
  showEdit,
  setShowEdit,
  handleUpdate,
  items,
  selectedImage,
  setSelectedImage,
  setBorrow,
  borrow,
}) => {
  const [isBorrowed, setIsBorrowed] = useState({
    label: items.isBorrowed ? "borrowed" : "returned",
    isBorrowed: items.isBorrowed,
  });
  const [location, setLocation] = useState({
    id: 1,
    label: items.location,
  });
  const [role, setRole] = useState({ id: 1, label: items?.role });

  const [startDate, setStartDate] = useState(new Date(items?.dateReturn));
  const [purpose, setPurpose] = useState({
    id: 1,
    label: items?.purpose,
  });
  const [selectedOption, setSelectedOption] = useState(
    items?.specificLocation || ""
  );
  const [customOption, setCustomOption] = useState(
    items?.specificLocation || ""
  );

  const fetchImage = async (itemId) => {
    if (!itemId) return;
    const result = await axios.get(`${links.default}/images/url/${itemId}`);
    return result.data;
  };

  useEffect(() => {
    let isMounted = true;
    async function updateBorrowWithImage() {
      try {
        const image = await fetchImage(items?.image?._id);
        if (image && isMounted) {
          setBorrow((borrow) =>
            borrow.map((item) =>
              item._id === items._id
                ? {
                    ...item,
                    image: { imageUrl: image, _id: items?.image?._id },
                  }
                : item
            )
          );
        }
      } catch (error) {
        console.error("Cannot update borrow with image", error);
      }
    }

    updateBorrowWithImage();

    return () => {
      isMounted = false;
    };
  }, []);

  const initialValues = {
    propertyNo: items?.propertyNo,
    fullName: items?.fullName,
    address: items?.address,
    contactNumber: items?.contactNumber,
    equipment: items?.equipment,
    qty: items?.qty,
    role: role?.label,
    location: location?.label,
    dateReturn: startDate.toISOString(),
    isBorrowed: isBorrowed?.isBorrowed,
    specificLocation: selectedOption === "" ? customOption : selectedOption,
    purpose: purpose.label,
    image: items?.image,
    _id: items?._id,
    purposeOthers: items?.purposeOthers,
    specificLocationOutside: items?.specificLocationOutside,
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
    purposeOthers: Yup.string(),
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
                <SelectForm
                  label="Purpose"
                  select={purpose}
                  selectItems={purposeItems}
                  onSetSelect={setPurpose}
                />
                {purpose?.label === "Others" && (
                  <AppFormField
                    name="purposeOthers"
                    placeholder="Other Purpose"
                    label="Other purpose"
                    fieldClass="text-black bg-gray-50"
                  />
                )}
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
                {location?.label === "Outside" ? (
                  <AppFormField
                    label="Specific Location"
                    name="specificLocationOutside"
                    placeholder="Specific Location"
                  />
                ) : (
                  <SelectComponent
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    customOption={customOption}
                    setCustomOption={setCustomOption}
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
              {/* <UploadImage
                type="edit"
                prevImage={items?.image}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              /> */}
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
