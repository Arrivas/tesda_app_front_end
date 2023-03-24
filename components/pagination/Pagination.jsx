import React from "react";

const Pagination = ({ pageNumbers, setCurrentPage, currentPage }) => {
  const showJumpButton =
    pageNumbers.length > 5 &&
    currentPage > 3 &&
    currentPage < pageNumbers.length - 2;
  return (
    <>
      <nav className="flex items-center justify-start md:justify-center my-2">
        <ul className="flex flex-wrap list-none">
          {showJumpButton && (
            <li>
              <a
                href="#!"
                className="inline-block py-2 px-3 rounded-md text-blue-500 hover:text-blue-700"
                onClick={() => setCurrentPage(1)}
              >
                &laquo;
              </a>
            </li>
          )}
          {pageNumbers.map((number, index) => {
            const isCurrentPage = number === currentPage;
            const showEllipsis =
              (index === 1 && currentPage > 4) ||
              (index === pageNumbers.length - 2 &&
                currentPage < pageNumbers.length - 3);
            const startingPage = currentPage - 2 > 1 ? currentPage - 2 : 1;
            const endingPage =
              currentPage + 2 < pageNumbers.length
                ? currentPage + 2
                : pageNumbers.length;
            if (
              (index === 0 ||
                index === pageNumbers.length - 1 ||
                (number >= startingPage && number <= endingPage)) &&
              !showEllipsis
            ) {
              return (
                <li key={number}>
                  <a
                    href="#!"
                    className={`inline-block py-2 px-4 rounded-md transition-colors ${
                      isCurrentPage
                        ? `bg-[#0035a9] text-white`
                        : "text-gray-700 hover:bg-blue-100"
                    }`}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </a>
                </li>
              );
            } else if (showEllipsis) {
              return (
                <li key={number}>
                  <span className="inline-block py-2 px-3 rounded-md">...</span>
                </li>
              );
            } else {
              return null;
            }
          })}
          {showJumpButton && (
            <li>
              <a
                href="#!"
                className="inline-block py-2 px-3 rounded-md text-blue-500 hover:text-blue-700"
                onClick={() => setCurrentPage(pageNumbers.length)}
              >
                &raquo;
              </a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
