import CategoryItem from "./CategoryItem";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./Category.css";
const Category = () => {

  // const [categories, setCategories] = useState([]);
  // const navigate = useNavigate();
  // const apiUrl = import.meta.env.VITE_API_BASE_URL;

  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="category-list">
          <CategoryItem></CategoryItem>
          <CategoryItem></CategoryItem>
          <CategoryItem></CategoryItem>
          <CategoryItem></CategoryItem>
          <CategoryItem></CategoryItem>
          <CategoryItem></CategoryItem>
        </ul>
      </div>
    </section>
  );
};

export default Category;
