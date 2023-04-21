import React from "react";

const ClassficationField = ({
  amount,
  setAmount,
  classification,
  setClassification,
}) => {
  const formatAsCurrency = (value) => {
    const formatter = new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    });

    return formatter.format(value);
  };

  return (
    <div className="bg-white w-full flex flex-1 space-x-5">
      <div className="flex-1">
        <span className="px-3 font-semibold bg-white text-xs w-full">
          amount
        </span>
        <div className="w-full relative flex-1 flex items-center p-[1px] justify-center text-start border border-gray-400 rounded-md">
          <input
            value={amount}
            onChange={(e) => {
              const inputValue = e.target.value;
              setClassification(
                inputValue >= 50000 ? "PPE" : "Semi-Expendable"
              );
              const isInteger = !Number.isNaN(Number(inputValue));

              if (isInteger) setAmount(inputValue);
            }}
            className="p-[10px] w-full"
          />
        </div>
      </div>
      <div className="flex-1">
        <span className="px-3 font-semibold bg-white text-xs w-full">
          classification
        </span>
        <div className="flex flex-row items-center justify-between pr-5">
          <p className="text-lg break-all flex-1">{formatAsCurrency(amount)}</p>
          <div className="bg-gray-200 p-2 rounded-md flex-1 text-center">
            <p className="text-gray-900 font-semibold">{classification}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassficationField;
