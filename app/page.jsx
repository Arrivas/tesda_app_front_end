"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import links from "@/config/links";
import { toast } from "react-hot-toast";

const Home = () => {
  const [borrow, setBorrow] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const fetchBorrow = async () => {
    try {
      const result = await axios.get(`${links.default}/borrow/get/all`);
      return result;
    } catch (error) {
      toast.error("something went wrong, cannot get borrow lists");
    }
  };
  useEffect(() => {
    let ready = true;
    if (ready) fetchBorrow().then((res) => setBorrow(res.data));

    return () => {
      ready = false;
    };
  }, []);
  console.log(selectedCheckbox);
  return (
    <>
      <div className="table-responsive overflow-x-scroll">
        <table className="w-full">
          <thead className="bg-[#f6f6f6]">
            <tr>
              <th className="text-[#9b9b9b] w-[5%] p-3">
                <input
                  name="checkAll"
                  type="checkbox"
                  className=""
                  onChange={() => {
                    const newSelectedItems = {};
                    items.forEach((item) => {
                      newSelectedItems[item._id] = true;
                    });
                    setSelectedCheckbox(newSelectedItems);
                  }}
                />
              </th>
              <th className="text-[#9b9b9b] font-semibold text-start w-[4%]">
                No.
              </th>
              <th className="text-[#9b9b9b] font-semibold text-start">SSP</th>
              <th className="text-[#9b9b9b] font-semibold text-start">
                Property Number
              </th>
              <th className="text-[#9b9b9b] font-semibold text-start">
                Received By
              </th>
            </tr>
          </thead>
          <tbody>
            {borrow?.map((item, index) => (
              <tr key={item._id}>
                <td className="text-center py-2">
                  <input
                    name={`checkbox${index + 1}`}
                    type="checkbox"
                    className=""
                    checked={selectedCheckbox[item._id]}
                    onChange={() =>
                      setSelectedCheckbox([
                        {
                          ...selectedCheckbox,
                          [item._id]: !selectedCheckbox[item._id],
                        },
                      ])
                    }
                  />
                </td>
                <td className="w-[4%]">{index + 1}</td>
                <td>{item.SSP}</td>
                <td>{item.propertyNo}</td>
                <td>{item.receivedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
