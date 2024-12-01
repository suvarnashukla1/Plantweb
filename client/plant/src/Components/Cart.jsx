import React, { useEffect, useState } from 'react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);

    // Calculate total price with decimal precision
    const totalPrice = storedCart.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0);
    setTotal(totalPrice);
  }, []);

  // Remove item from cart
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Recalculate total price after removal with decimal precision
    const totalPrice = updatedCart.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0);
    setTotal(totalPrice);
  };

  // PayPal Button rendering logic
  useEffect(() => {
    const paypalContainer = document.getElementById('paypal-button-container');

    // Only initialize PayPal button if there are items in the cart
    if (cartItems.length > 0 && window.paypal) {
      // Clear previous PayPal button instances
      paypalContainer.innerHTML = ''; 

      // Format the total to two decimal places
      const formattedTotal = total.toFixed(2); // Ensure total has two decimals

      // Create PayPal button
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: formattedTotal }, // Pass formatted total to PayPal
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Payment successful! Transaction ID: ${details.id}`);
          });
        },
        onError: (err) => {
          console.error('PayPal Checkout Error:', err);
          alert('Something went wrong with the payment. Please try again.');
        },
      }).render('#paypal-button-container'); // Render the PayPal button in this div
    }
  }, [cartItems, total]); // Re-run when cartItems or total changes

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty! :) Please visit our store!</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <h6>{item.seller}</h6>
                  <p className="eachpri">{item.price}</p>
                  <p className="quant">Quantity: {item.quantity}</p>
                  <p className="pricet">Total Price: ₹{item.totalPrice.toFixed(2)}</p>
                  <button className="reemo" onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: ₹{total.toFixed(2)}</h3>
            {cartItems.length > 0 && <div id="paypal-button-container"></div>}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
