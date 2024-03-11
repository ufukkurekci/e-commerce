import { createContext, useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

const CardProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cartItem) => {
    setCartItems((prevItems) => [...prevItems, {
        ...cartItem,
        quantity: cartItem.quantity ? cartItem.quantity : 1,
    }
]);
console.log("addToCart",cartItem);
  };

  const removeFromCart = (id) => {
    return setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
      
    );
    
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CardProvider.propTypes = {
  children: PropTypes.node,
};
export default CardProvider;
