import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import PropTypes from "prop-types";
import Search from "../components/modal/search/Search";
import { useEffect, useState } from "react";
import Dialog from "../components/modal/Dialog/Dialog";
const MainLayout = (props) => {
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [isShowDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const dailogstatus = localStorage.getItem("dailog")
      ? JSON.parse(localStorage.getItem("dailog"))
      : localStorage.setItem("dailog", JSON.stringify(true));
    setTimeout(() => {
      setShowDialog(dailogstatus);
    }, 2000);
  }, []);

  return (
    <div className="main-layout">
      <Dialog
        isShowDialog={isShowDialog}
        setIsShowDialog={setShowDialog}
      ></Dialog>
      <Search
        isSearchShow={isSearchShow}
        setIsSearchShow={setIsSearchShow}
      ></Search>
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
