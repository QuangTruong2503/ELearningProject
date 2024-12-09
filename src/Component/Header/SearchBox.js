import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox() {
    const [search, setSearch] = useState();
    const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`search/${search}`);
  };
  return (
    <form className="d-flex col-lg-6 col-md-12 col-12 my-2" role="search" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Tìm kiếm khóa học"
        aria-label="Search"
        required
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}

export default SearchBox;
