import { useEffect, useState } from "react";
import "./Product.css";
import ProductItem from "./ProductItem";
import PropTypes from "prop-types";
// import productsData from "../../data.json";
import Slider from "react-slick";
import { message } from "antd";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/product/getall`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setloading(false);
        } else {
          message.error("Ürünler çekilemedi.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchProducts();
  }, [apiUrl]);

  if (loading) {
    return;
  }
  const NextBtn = ({ onClick }) => {
    return (
      <button className="glide__arrow glide__arrow--right" onClick={onClick}>
        <i className="bi bi-chevron-right"></i>
      </button>
    );
  };
  const PrevBtn = ({ onClick }) => {
    return (
      <button className="glide__arrow glide__arrow--left" onClick={onClick}>
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

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 200,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <div className="glide__track">
            <Slider {...sliderSettings}>
              {products.map((product) => (
                <ProductItem
                  productItem={product}
                  key={product._id}
                ></ProductItem>
              ))}
            </Slider>
          </div>
          <div className="glide__arrows"></div>
        </div>
      </div>
    </section>
  );
};

export default Product;

Product.propTypes = {
  products: PropTypes.array,
  setproducts: PropTypes.func,
};
