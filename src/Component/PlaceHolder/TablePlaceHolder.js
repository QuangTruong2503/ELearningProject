import React, { useState } from "react";

function TablePlaceHolder({ numbCols = 0, numbRows = 0 }) {
  const [colArrays, setColArrays] = useState([]);
  const [rowArrays, setRowArrays] = useState([]);
  useState(() => {
    if ((numbCols !== 0, numbRows !== 0)) {
      const colArr = [];
      const rowArr = [];
      for (let i = 1; i <= numbCols; i++) {
        colArr.push(i);
      }
      for (let i = 1; i <= numbRows; i++) {
        rowArr.push(i);
      }
      setColArrays(colArr);
      setRowArrays(rowArr);
    }
  }, [numbCols, numbRows]);
  return (
    <>
      {rowArrays.length !== 0 &&
        rowArrays.map((item) => (
          <tr key={item}>
            {colArrays.length !== 0 &&
              colArrays.map((item) => (
                <td key={item}>
                  <span class="placeholder placeholder-lg col-8"></span>
                </td>
              ))}
          </tr>
        ))}
    </>
  );
}

export default TablePlaceHolder;
