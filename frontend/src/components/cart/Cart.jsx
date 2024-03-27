import { useContext } from "react";
import CardTotals from "./CardTotals";
import "./Cart.css";
import CartCoupon from "./CartCoupon";
import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import { CartContext } from "../../context/CardProvider";
const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <section className="cart-page">
      <div className="container">
      {cartItems.length > 0 ? (        <div className="cart-page-wrapper">
          <form className="cart-form">
            <CartProgress></CartProgress>
            <div className="shop-table-wrapper">
              <CartTable></CartTable>
              <CartCoupon></CartCoupon>
            </div>
          </form>
          <div className="cart-collaterals">
            <CardTotals></CardTotals>
          </div>
        </div>) : (<h2 style={{
          textAlign: "center",
        }}>SEPETİNİZ BOŞ</h2>)}
      </div>
    </section>
  );
};

export default Cart;
