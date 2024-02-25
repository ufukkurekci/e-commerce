import { useContext } from "react";
import "./ProductItem.css";
import PropTypes from "prop-types";
import { CartContext } from "../../context/CardProvider";
import { Link } from "react-router-dom";
const ProductItem = ({ productItem}) => {
const {cartItems,addToCart} = useContext(CartContext);
const filteredCart = cartItems.find((cartItems) => cartItems.id === productItem.id);
  return (
    <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <a href="#">
          <img src={productItem.images[0].thumbUrl} alt="" className="img1" />
          <img src={productItem.images[1].thumbUrl} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">
          {productItem.name}
        </a>
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <div className="product-prices">
          <strong className="new-price">
            {`${productItem.price.basePrice.toFixed(2)} TL`}
          </strong>
          <span className="old-price">
          {`${productItem.price.discountPrice.toFixed(2)} TL`}
          </span>
        </div>
        <span className="product-discount">-{productItem.discount}%</span>
        <div className="product-links">
          <button
            className="add-to-cart"
            onClick={() => addToCart(productItem)}
            disabled={filteredCart}
          >
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`product/${productItem.id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  productItem: PropTypes.object,
  setCartItems: PropTypes.func,
};

