import { useEffect, useState } from "react";
import "./ProductGallery.css";
import Slider from "react-slick";
import PropTypes from "prop-types";

const NextBtn = ({ onClick }) => {
  return (
    <button
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      onClick={onClick}
      style={{
        zIndex: "100",
      }}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  );
};
const PrevBtn = ({ onClick }) => {
  return (
    <button
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
      onClick={onClick}
      style={{
        zIndex: "100",
      }}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
};

NextBtn.propTypes = {
  onClick: PropTypes.func,
};
PrevBtn.propTypes = {
  onClick: PropTypes.func,
};

const ProductGallery = ({ product }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [activeImage, setActiveImage] = useState("");
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(baseUrl + product.images[0].pathUrl);
    }
  }, [product, baseUrl]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };
  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={`${activeImage}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...sliderSettings}>
              {product &&
                product.images.map((item, index) => (
                  <li
                    onClick={() => setActiveImage(baseUrl + item.pathUrl)}
                    className="glide__slide"
                    key={index}
                  >
                    <img
                      className={`img-fluid ${
                        item === activeImage ? "active" : ""
                      }`}
                      src={`${baseUrl + item.pathUrl}`}
                      alt=""
                    />
                  </li>
                ))}
            </Slider>
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls"></div>
      </div>
    </div>
  );
};

ProductGallery.propTypes = {
  product: PropTypes.object,
};

export default ProductGallery;
