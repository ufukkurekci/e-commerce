import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/CardProvider";
const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext);
  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={cartItem.images[0].thumbUrl} alt="" />
        <i
          className="bi bi-x delete-cart"
          onClick={() => removeFromCart(cartItem._id)}
        ></i>
      </td>
      <td>{cartItem.name}</td>
      <td>{`${cartItem.discountedPrice} TL`}</td>
      <td className="product-quantity">{cartItem.quantity}</td>
      <td className="product-subtotal">
        {`${(cartItem.discountedPrice * cartItem.quantity).toFixed(2)} TL`}
      </td>
    </tr>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object,
};

export default CartItem;
