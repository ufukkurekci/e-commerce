import Reviews from "../../reviews/Reviews";
import "./ProductTabs.css";
import { useState } from "react";
import PropTypes from "prop-types";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("desc");

  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };
  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "desc" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "desc")}
          >
            Ürün Bilgisi
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "reviews")}
          >
            Yorumlar
          </a>
        </li>
      </ul>
      <div className="tab-panel">
        <div
          className={`tab-panel-descriptions content ${
            activeTab === "desc" ? "active" : ""
          }`}
        >
      <p
        className="product-description"
        dangerouslySetInnerHTML={{ __html: product.description }}
      ></p>
        </div>
        <Reviews
          active={activeTab === "reviews" ? "content active" : "content"} product={product}
        ></Reviews>
      </div>
    </div>
  );
};

export default ProductTabs;

ProductTabs.propTypes = {
  product: PropTypes.string,
};
