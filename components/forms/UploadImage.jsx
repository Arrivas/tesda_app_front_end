import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

const UploadImage = ({
  selectedImage,
  setSelectedImage,
  prevImage,
  type = "default",
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileSelect = (e) => {
    setSelectedImage(e.target.files[0]);

    const url = URL.createObjectURL(e.target.files[0]);
    setPreviewUrl(url);
  };
  return (
    <>
      <div className="">
        <h1 className="text-2xl">
          {type === "default" ? " Upload" : "Edit/Add"} Image
          {type === "default" && (
            <span className="text-gray-400">(optional)</span>
          )}
        </h1>
        <div className="flex items-center w-full my-2">
          <label
            htmlFor="file"
            className="h-[50px] w-full rounded-lg flex items-center justify-center cursor-pointer bg-gray-200"
          >
            <PhotoIcon height={25} width={25} className="text-gray-600" />
            <span>select</span>
          </label>
        </div>
        <div className="flex items-center flex-col">
          {previewUrl || prevImage?.imageUrl ? (
            <img
              src={previewUrl || prevImage?.imageUrl}
              alt="Preview"
              className="max-w-full mb-4 rounded-md h-[300px] w-full object-cover"
            />
          ) : null}
        </div>
        <input
          type="file"
          id="file"
          name="file"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    </>
  );
};

export default UploadImage;
