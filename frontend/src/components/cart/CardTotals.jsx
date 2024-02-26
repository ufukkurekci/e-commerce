import { useContext } from "react";
import { CartContext } from "../../context/CardProvider";
import { useState } from "react";

const CardTotals = () => {
  const {cartItems} = useContext(CartContext);

  const [fastCargoChecked, setfastCargoChecked] = useState(false);
  const cartItemTotals = cartItems.map((item) =>{
    const itemTotal = item.discountedPrice * item.quantity;
    return itemTotal;
  });

  const subTotals = cartItemTotals.reduce((previousValue, currentValue) =>{
    return previousValue + currentValue;
  },0);

  const cargoFee = 15;

  const 
  cardTotals = fastCargoChecked ? (subTotals + cargoFee).toFixed(2) : subTotals.toFixed(2);

  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">{`${subTotals.toFixed(2)} TL`}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Ücretsiz Kargo
                    <input type="checkbox" id="fast-cargo"
                    checked={fastCargoChecked} onChange={() => setfastCargoChecked(!fastCargoChecked)} />
                  </label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">{`${cardTotals} TL`}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default CardTotals;
