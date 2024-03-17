import { createContext, useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { message } from "antd";

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
    const isExist = cartItems.filter((item) => item._id === cartItem._id);

    if (isExist.length > 0) {
      // send from detail page
      if (cartItem.quantity >= 1) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item._id === cartItem._id
              ? { ...item, quantity: item.quantity + cartItem.quantity }
              : item
          )
        );
        message.success(`${cartItem.name} ürünü adedi güncellendi!`);
      }
      // send from homepage
      if (cartItem.quantity === undefined) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item._id === cartItem._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        message.success(`${cartItem.name} ürünü 1 adet arttırıldı!`);
      }
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        {
          ...cartItem,
          price: cartItem.price,
          quantity: cartItem.quantity ? cartItem.quantity : 1,
        },
      ]);
      message.success("Ürün sepete eklendi");
    }

    console.log("addToCart(cardprovider)", cartItem);
  };

  const removeFromCart = (id) => {
    const items =  setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
    message.warning("Ürün sepetten kaldırıldı")
    return items;
    
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems,
        removeFromCart,
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
