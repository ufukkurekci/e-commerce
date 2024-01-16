import React from "react";
import Header from "../components/header/Header";
import Slider from "../components/slider/Slider";
import Category from "../components/category/Category";
import Product from "../components/product/Product";
import Campains from "../components/campains/Campains";
import Blogs from "../components/blogs/Blogs";
import Brands from "../components/brands/Brands";
import CampainSingle from "../components/campainsingle/CampainSingle";
import Footer from "../components/footer/Footer";
const HomePage = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Slider></Slider>
      <Category></Category>
      <Product></Product>
      <Campains></Campains>
      <Product></Product>
      <Blogs></Blogs>
      <Brands></Brands>
      <CampainSingle></CampainSingle>
      <Footer></Footer>
    </React.Fragment>
  );
};

export default HomePage;
