import React from "react";
import Slider from "../components/slider/Slider";
import Category from "../components/category/Category";
import Product from "../components/product/Product";
import Campains from "../components/campains/Campains";
import Blogs from "../components/blogs/Blogs";
import Brands from "../components/brands/Brands";
import CampainSingle from "../components/campainsingle/CampainSingle";
const HomePage = () => {
  return (
    <React.Fragment>
      <Slider></Slider>
      <Category></Category>
      <Product></Product>
      <Campains></Campains>
      <Product></Product>
      <Blogs></Blogs>
      <Brands></Brands>
      <CampainSingle></CampainSingle>
    </React.Fragment>
  );
};

export default HomePage;
