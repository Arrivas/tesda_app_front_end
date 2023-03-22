const paginate = (itemsPerPage, totalItems) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

export default paginate;
