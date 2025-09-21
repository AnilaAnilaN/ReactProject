import React, { useContext } from 'react';
import { CartContext } from '../context/CartProvider.jsx';
import { Link } from 'react-router-dom';
import './Cart.css';

const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateCartItem, clearCart, loadingCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
  };

  if (loadingCart) {
    return <div className="cart-page">Loading cart...</div>;
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart.items.length === 0 ? (
          <p>Your cart is empty. <Link to="/shop">Start Shopping</Link></p>
        ) : (
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.product._id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.product.name}</h3>
                  <p>Price: ${(item.product.price || 0).toFixed(2)}</p>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateCartItem(item.product._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartItem(item.product._id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.product._id)} className="remove-item-btn">Remove</button>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <h3>Total: ${cart.total ? cart.total.toFixed(2) : '0.00'}</h3>
              <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
              <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;