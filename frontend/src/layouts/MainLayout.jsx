import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import PropTypes from "prop-types";
const MainLayout = (props) => {
  return (
    <>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </>
  );
};

MainLayout.propTypes = {
    children: PropTypes.node
};

export default MainLayout;


