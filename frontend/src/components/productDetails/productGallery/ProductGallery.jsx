import { useEffect, useState } from "react";
import "./ProductGallery.css";
// import productsData from "../../../data.json";
import Slider from "react-slick";
import PropTypes from "prop-types";

const NextBtn = ({ onClick }) => {
  return (
    <button
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      onClick={onClick}
      style={{
        zIndex: "100"
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
        zIndex: "100"
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

const ProductGallery = ({productGalleryId}) => {
  const [activeImage, setActiveImage] = useState("");
  const [currentProduct, setcurrentProduct] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
useEffect(() => {

  // const product = productsData.find(p => p._id === Number(productGalleryId));

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/product/get/${productGalleryId}`);
      if(response.ok) {
        const data = await response.json();
        if(data){
          console.log(data.product.images[0]);
          setActiveImage(data.product.images[0].thumbUrl);
          setcurrentProduct(data.product);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  fetchProduct();


},[productGalleryId])

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
              {currentProduct && currentProduct.images.map((item, index) => (
                <li
                  onClick={() => setActiveImage(item.thumbUrl)}
                  className="glide__slide"
                  key={index}
                >
                  <img
                    className={`img-fluid ${
                      item === activeImage ? "active" : ""
                    }`}
                    src={`${item.thumbUrl}`}
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
  productGalleryId:PropTypes.string,
};

export default ProductGallery;
