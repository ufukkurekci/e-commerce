import CardTotals from "./CardTotals";
import "./Cart.css";
import CartCoupon from "./CartCoupon";
import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
const Cart = () => {
  return (
    <section className="cart-page">
      <div className="container">
        <div className="cart-page-wrapper">
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
        </div>
      </div>
    </section>
  );
};

export default Cart;
