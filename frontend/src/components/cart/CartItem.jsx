import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/CardProvider";
const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  console.log(cartItem);
  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={baseUrl + cartItem.images[0].pathUrl} alt="" />
        <i
          className="bi bi-x delete-cart"
          onClick={() => removeFromCart(cartItem._id)}
        ></i>
      </td>
      <td>{cartItem.name}</td>
      <td>{`${cartItem.price} TL`}</td>
      <td className="product-quantity">{cartItem.quantity}</td>
      <td className="product-subtotal">
        {`${(cartItem.price * cartItem.quantity).toFixed(2)} TL`}
      </td>
    </tr>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object,
};

export default CartItem;
