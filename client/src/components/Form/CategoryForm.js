import React from "react";

const CategoryForm = ({ value, setValue, handleSubmit, action = "Submit" }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {action}
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
