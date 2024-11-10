import React, { useEffect, useState } from "react";

function PaginationsComponent({currentPage, totalPage, changePage}) {
  const [totalPageArray, setTotalPageArray] = useState([]);

    const handleChangePage = (page) =>{
        changePage(page);
    }
  useEffect(() => {
    const calcPage = () => {
      const pageArrays = [];
      for (let i = 1; i <= totalPage; i++) {
        pageArrays.push(i);
      }
      setTotalPageArray(pageArrays);
    };
    calcPage();
  }, [totalPage]);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {/* Previous button */}
        {currentPage > 1 && (
          <li className="page-item">
            <button className="page-link" href="#" aria-label="Previous" onClick={() => handleChangePage(currentPage - 1)}>
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
        )}
        {/* Paginations */}
        {totalPageArray.map((item, index) => (
          <li
            className={`page-item ${(item === currentPage)? "active" : ""}`}
            key={index}
          >
            <button className="page-link" onClick={() => handleChangePage(item)}>{item}</button>
          </li>
        ))}

        {/* Next button */}
        {currentPage < totalPage && (
          <li className="page-item">
            <button className="page-link" href="#" aria-label="Next" onClick={() => handleChangePage(currentPage + 1)}>
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default PaginationsComponent;
