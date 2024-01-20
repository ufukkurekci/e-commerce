import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import PropTypes from "prop-types";
import Search from "../components/modal/search/Search";
import { useState } from "react";
const MainLayout = (props) => {
  const [isSearchShow, setIsSearchShow] = useState(false);
  return (
    <div className="main-layout">
      <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow}></Search>
      <Header setIsSearchShow={setIsSearchShow}></Header>
      {props.children}
      <Footer></Footer>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
