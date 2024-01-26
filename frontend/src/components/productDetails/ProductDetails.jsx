import "./ProductDetails.css";
import BreadCrumb from "./breadcrumb/BreadCrumb";
import ProductGallery from "./productGallery/ProductGallery";
import ProductInfo from "./productInfo/ProductInfo";
import ProductTabs from "./productTabs/ProductTabs";
import PropTypes from "prop-types";

const ProductDetails = ({ productId }) => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <BreadCrumb></BreadCrumb>
          <div className="single-content">
            <main className="site-main">
              <ProductGallery productGalleryId={productId}></ProductGallery>
              <ProductInfo></ProductInfo>
            </main>
          </div>
          <ProductTabs></ProductTabs>
        </div>
      </div>
    </section>
  );
};

ProductDetails.propTypes = {
  productId: PropTypes.string,
};
export default ProductDetails;
