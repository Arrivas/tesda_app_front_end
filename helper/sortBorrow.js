const sortBorrow = (arr, sort, active) => {
  const borrowCopy = [...arr];
  return borrowCopy.sort((a, b) => {
    if (sort === "asc") {
      if (active === "Property Number")
        return a.propertyNo > b.propertyNo ? 1 : -1;
      else if (active === "Equipment")
        return a.equipment > b.equipment ? 1 : -1;
      else if (active === "Qty") return a.receivedBy > b.receivedBy ? 1 : -1;
      else if (active === "Name") return a.receivedBy > b.receivedBy ? 1 : -1;
      else if (active === "Status") return a.status > b.status ? 1 : -1;
      else if (active === "Role") return a.status > b.status ? 1 : -1;
      else if (active === "Timestamp")
        return a.createdAt > b.createdAt ? 1 : -1;
    } else {
      if (active === "Property Number")
        return a.propertyNo > b.propertyNo ? -1 : 1;
      else if (active === "Equipment")
        return a.equipment > b.equipment ? -1 : 1;
      else if (active === "Qty") return a.receivedBy > b.receivedBy ? -1 : 1;
      else if (active === "Name") return a.receivedBy > b.receivedBy ? -1 : 1;
      else if (active === "Status") return a.status > b.status ? -1 : 1;
      else if (active === "Role") return a.status > b.status ? -1 : 1;
      else if (active === "Timestamp")
        return a.createdAt > b.createdAt ? -1 : 1;
    }
  });
};

export default sortBorrow;
