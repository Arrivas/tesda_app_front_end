import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  QrCodeIcon,
} from "@heroicons/react/24/solid";
import SearchFilter from "@/components/home/SearchFilter";
import NewBorrowModal from "@/components/home/NewBorrowModal";

const TableMenu = ({
  search,
  setSearch,
  selectedQr,
  searchFilter,
  selectedItems,
  setSearchFilter,
  showQr,
  setShowQr,
  onNewSubmit,
}) => {
  const [showNew, setShowNew] = useState(false);
  return (
    <>
      <div className="flex my-4 flex-col md:flex-row h-[46px]">
        <div className="flex-1 flex items-center w-full md:space-x-2 my-1 flex-col md:flex-row space-y-1 md:space-y-0">
          <div className="flex w-full items-center border border-gray-200 p-2 rounded-md">
            <MagnifyingGlassIcon className="h-4 w-4" />
            <input
              className="w-full focus:outline-none px-2"
              placeholder="search..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <SearchFilter
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
          />
        </div>
        <div className="flex-1 flex justify-end space-x-2 my-1">
          {selectedQr?.length > 0 && (
            <button
              onClick={() => setShowQr(!showQr)}
              className="flex items-center hover:border hover:border-black  border border-white p-2 px-3 rounded-md space-x-1"
            >
              <QrCodeIcon className="h-4 w-4" />
              <span className="text-black font-semibold">show qr</span>
            </button>
          )}
          {selectedItems?.length > 0 && (
            <button className="flex items-center hover:bg-[#ff6c6c] bg-[#fb4847] p-2 px-3 rounded-md space-x-1">
              <TrashIcon className="h-4 w-4 text-white" />
              <span className="text-white font-semibold">remove</span>
            </button>
          )}
          {selectedItems?.length > 0 && selectedItems?.length <= 1 && (
            <>
              <button className="flex items-center hover:bg-[#fcdd52] bg-[#fbd325] p-2 px-3 rounded-md space-x-1">
                <PencilIcon className="h-4 w-4 text-white" />
                <span className="text-white font-semibold">edit</span>
              </button>
            </>
          )}
          {selectedItems?.length < 1 && (
            <button
              onClick={() => setShowNew(true)}
              className="flex items-center hover:bg-[#2c51a0] bg-[#0035A9] p-2 px-3 rounded-md space-x-1"
            >
              <PlusIcon className="h-4 w-4 text-white" />
              <span className="text-white font-semibold">new</span>
            </button>
          )}
        </div>
      </div>
      {/* modal */}
      <NewBorrowModal
        showNew={showNew}
        setShowNew={setShowNew}
        onNewSubmit={onNewSubmit}
      />
    </>
  );
};

export default TableMenu;
