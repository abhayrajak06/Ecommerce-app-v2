import React from "react";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  //handlesubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v2/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex search" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2 search"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          // style={{ width: "36rem" }}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
