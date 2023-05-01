"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import links from "../config/links";
import { useSelector } from "react-redux";
import moment from "moment";

const page = () => {
  const [pastDues, setPastDues] = useState([]);
  const fetchPastDues = async () => {
    try {
      const result = await axios.get(`${links.default}/borrow/get/reminder`);
      return result.data;
    } catch (error) {
      console.log("cannot get past dues");
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) fetchPastDues().then((res) => setPastDues(res));

    return () => {
      isMounted = false;
    };
  }, []);

  console.log(pastDues);
  return (
    <>
      <div className="p-5">
        <h1 className="font-bold text-2xl">PAST DUE/S!</h1>
        <div className="overflow-y-scroll my-2 h-[90vh]">
          {pastDues.map((item) => (
            <>
              <div className="flex max-w-[80%] self-center bg-green-900 mb-2 rounded-md text-white">
                <div className="flex-1 p-5">
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold flex-1">Property No.:</p>
                    <p className="font-ligt fex-1">{item.propertyNo}</p>
                  </div>
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold flex-1">Borrower:</p>
                    <p className="font-ligt fex-1">{item.borrowerName}</p>
                  </div>
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold flex-1">Equipment:</p>
                    <p className="font-ligt fex-1">{item.equipment}</p>
                  </div>
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold flex-1">Role:</p>
                    <p className="font-ligt fex-1">{item.role}</p>
                  </div>
                </div>
                <div className="flex-1 p-5">
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold flex-1">Qty:</p>
                    <p className="font-ligt fex-1">{item.qty}</p>
                  </div>
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold flex-1">Return Date:</p>
                    <p className="font-ligt fex-1">
                      {moment(item.dateReturn).format("LLLL")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex max-w-[80%] self-center bg-green-900 mb-2 rounded-md text-white">
                <div className="flex-1 p-5">
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold flex-1">Property No.:</p>
                    <p className="font-ligt fex-1">{item.propertyNo}</p>
                  </div>
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold flex-1">Borrower:</p>
                    <p className="font-ligt fex-1">{item.borrowerName}</p>
                  </div>
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold flex-1">Equipment:</p>
                    <p className="font-ligt fex-1">{item.equipment}</p>
                  </div>
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold flex-1">Role:</p>
                    <p className="font-ligt fex-1">{item.role}</p>
                  </div>
                </div>
                <div className="flex-1 p-5">
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold flex-1">Qty:</p>
                    <p className="font-ligt fex-1">{item.qty}</p>
                  </div>
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold flex-1">Return Date:</p>
                    <p className="font-ligt fex-1">
                      {moment(item.dateReturn).format("LLLL")}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
