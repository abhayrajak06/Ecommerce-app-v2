import { useState, useEffect } from "react";
import axios from "axios";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  //get categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`/api/v2/category/get-category`);
      setCategories(data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};

export default useCategory;
