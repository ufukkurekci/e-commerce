import { useContext } from "react";
import { CartContext } from "../../context/CardProvider";
import { useState } from "react";

const CardTotals = () => {
  const { cartItems } = useContext(CartContext);

  const [fastCargoChecked, setfastCargoChecked] = useState(false);
  const cartItemTotals = cartItems.map((item) => {
    const itemTotal = item.price * item.quantity;
    console.log(cartItems);
    return itemTotal;
  });

  const cargoFee = 30;
  const subTotals = cartItemTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue
  }, 0);

  const cardTotals = fastCargoChecked
    ? (subTotals).toFixed(2)
    : (subTotals + cargoFee).toFixed(2);

  return (
    <div className="cart-totals">
      <h2>Sepet Tutarı</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Ara Toplam</th>
            <td>
              <span id="subtotal">{`${subTotals.toFixed(2)} TL`}</span>
            </td>
          </tr>
          <tr>
            <th>Kargo</th>
            <td>
              <ul>
                <li>
                  <label>
                    Ücretsiz Kargo
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargoChecked}
                      onChange={() => setfastCargoChecked(!fastCargoChecked)}
                    />
                  </label>
                </li>
                <li>
                  <a href="#">Kargo Ücreti : 30 TL</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Toplam</th>
            <td>
              <strong id="cart-total">{`${cardTotals} TL`}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg">Siparişi Tamamla </button>
      </div>
    </div>
  );
};

export default CardTotals;
