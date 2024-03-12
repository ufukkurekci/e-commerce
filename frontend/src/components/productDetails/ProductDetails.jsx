import { useEffect, useState } from "react";
import "./ProductDetails.css";
import BreadCrumb from "./breadcrumb/BreadCrumb";
import ProductGallery from "./productGallery/ProductGallery";
import ProductInfo from "./productInfo/ProductInfo";
import ProductTabs from "./productTabs/ProductTabs";
import PropTypes from "prop-types";
import { Spin } from "antd";

const ProductDetails = ({ productId }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // const baseUrl = import.meta.env.VITE_BASE_URL;
  const [currentProduct, setcurrentProduct] = useState(null);
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      setloading(true);
      try {
        const response = await fetch(`${apiUrl}/product/get/${productId}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            console.log(data.images[0]);
            setcurrentProduct(data);
          }
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setloading(false);
      }
    };
    fetchProduct();
  }, [apiUrl,productId]);



  return currentProduct ? (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <BreadCrumb></BreadCrumb>
          <div className="single-content">
            <main className="site-main">
              <ProductGallery product={currentProduct}></ProductGallery>
              <ProductInfo product={currentProduct}></ProductInfo>
            </main>
          </div>
          <ProductTabs></ProductTabs>
        </div>
      </div>
    </section>
  ) : (
    <Spin spinning={loading}>
    </Spin>
  );
};

ProductDetails.propTypes = {
  productId: PropTypes.string,
};
export default ProductDetails;
