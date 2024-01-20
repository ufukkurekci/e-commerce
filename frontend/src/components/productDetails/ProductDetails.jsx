import "./ProductDetails.css";
import BreadCrumb from "./breadcrumb/BreadCrumb";
import ProductGallery from "./productGallery/ProductGallery";
import ProductInfo from "./productInfo/ProductInfo";
import ProductTabs from "./productTabs/ProductTabs";
const ProductDetails = () => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <BreadCrumb></BreadCrumb>
          <div className="single-content">
            <main className="site-main">
              <ProductGallery></ProductGallery>
              <ProductInfo></ProductInfo>
            </main>
          </div>
          <ProductTabs></ProductTabs>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
