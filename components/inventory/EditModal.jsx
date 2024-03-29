import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import FormikField from "../forms/FormikField";
import AppFormField from "../forms/AppFormField";
import SubmitButton from "../forms/SubmitButton";
import * as Yup from "yup";
import DatePickerField from "../forms/DatePickerField";
import moment from "moment";
import UploadImage from "../forms/UploadImage";
import links from "../../config/links";
import axios from "axios";
import ClassficationField from "../forms/ClassficationField";
import SelectForm from "../forms/SelectForm";

const conditionItems = [
  { id: 1, label: "Serviceable" },
  { id: 2, label: "Unserviceable" },
];

const unitItems = [
  { id: 1, label: "pc/s" },
  { id: 2, label: "kg" },
  { id: 3, label: "meter" },
  { id: 4, label: "unit" },
];

const EditModal = ({
  showEdit,
  setShowEdit,
  handleUpdate,
  items,
  selectedImage,
  setSelectedImage,
  setInventory,
}) => {
  const [startDate, setStartDate] = useState(new Date(items?.purchaseDate));
  const [amount, setAmount] = useState(items.amount);
  const [classification, setClassification] = useState(
    items?.classification || ""
  );
  const [condition, setCondition] = useState({ id: 1, label: items.condition });
  const [unit, setUnit] = useState({ id: 1, label: items.unit });

  const initialValues = {
    propertyNo: items?.propertyNo,
    equipment: items?.equipment,
    qty: items?.qty,
    specification: items?.specification,
    receiveBy: items?.receiveBy,
    purchaseDate: startDate.toISOString(),
    unit: unit.label,
    amount,
    classification,
    condition: condition?.label,
    _id: items?._id,
  };

  const validationSchema = Yup.object({
    propertyNo: Yup.string().required("field must not be empty"),
    equipment: Yup.string().required("field must not be empty"),
    qty: Yup.number().required("field must not be empty"),
    specification: Yup.string(),
    receiveBy: Yup.string().required("field must not be empty"),
  });

  const fetchImage = async (itemId) => {
    if (!itemId) return;
    const result = await axios.get(`${links.default}/images/url/${itemId}`);
    return result.data;
  };

  useEffect(() => {
    let isMounted = true;
    async function updateInventoryImage() {
      try {
        const image = await fetchImage(items?.image?._id);
        if (image && isMounted) {
          setInventory((inventory) =>
            inventory.map((item) =>
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
        // console.error("Cannot update borrow with image", error);
      }
    }

    updateInventoryImage();

    return () => {
      isMounted = false;
    };
  }, []);

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
              <AppFormField
                name="equipment"
                placeholder="Equipment"
                label="Equipment"
                fieldClass="text-black bg-gray-50"
              />
              <AppFormField
                name="receiveBy"
                placeholder="Receive By"
                label="Receive By"
                fieldClass="text-black bg-gray-50"
              />
              <div className="flex flex-row flex-items-center space-x-2">
                <AppFormField
                  name="qty"
                  placeholder="Qty"
                  label="Qty"
                  fieldClass="text-black bg-gray-50"
                />
                <AppFormField
                  name="specification"
                  placeholder="Specification"
                  label="Specification(optional)"
                  fieldClass="text-black bg-gray-50"
                />
              </div>

              <ClassficationField
                amount={amount}
                setAmount={setAmount}
                classification={classification}
                setClassification={setClassification}
              />

              <div className="flex items-center w-full space-x-2">
                <SelectForm
                  label="Condition"
                  select={condition}
                  selectItems={conditionItems}
                  onSetSelect={setCondition}
                />
                <SelectForm
                  selectItems={unitItems}
                  select={unit}
                  onSetSelect={setUnit}
                  label="Unit"
                />
              </div>
              <div className="flex items-center w-full space-x-2">
                <DatePickerField
                  label="Purchase Date"
                  startDate={startDate}
                  setStartDate={setStartDate}
                  type="inventory"
                />
                <div className="flex flex-col flex-1 py-2 justify-end">
                  <span className="font-semibold text-xs">Purchase Date</span>
                  <span>{moment(startDate).format("LLLL")}</span>
                </div>
              </div>
              {/* upload image */}
              <UploadImage
                type="edit"
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
