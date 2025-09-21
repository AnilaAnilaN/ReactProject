import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import api from '../api'; // Assuming you have an axios instance configured
import { UserContext } from './UserProvider.jsx';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 }); // Initialize cart with items array and total
  const [loadingCart, setLoadingCart] = useState(false);
  const { user, loading: loadingUser } = useContext(UserContext);

  // Fetch cart when user logs in or on initial load if user is already logged in
  useEffect(() => {
    const fetchCart = async () => {
      if (user && user._id && !loadingUser) {
        setLoadingCart(true);
        try {
          const { data } = await api.get('/api/cart');
          setCart(data);
        } catch (error) {
          console.error("Error fetching cart:", error);
          toast.error("Failed to load cart.");
          setCart({ items: [] }); // Reset cart on error
        } finally {
          setLoadingCart(false);
        }
      } else if (!user && !loadingUser) {
        // If no user is logged in, clear the cart (frontend only)
        setCart({ items: [] });
      }
    };
    fetchCart();
  }, [user, loadingUser]); // Re-run when user or loadingUser changes

  const addToCart = async (product, quantity = 1) => {
    if (!user || !user._id) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    setLoadingCart(true);
    try {
      const { data } = await api.post('/api/cart', { productId: product._id, quantity });
      setCart(data);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart.");
    } finally {
      setLoadingCart(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user || !user._id) {
      toast.error("Please log in to modify your cart.");
      return;
    }

    setLoadingCart(true);
    try {
      const { data } = await api.delete(`/api/cart/${productId}`);
      setCart(data);
      toast.success(`Item removed from cart!`);
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error(error.response?.data?.message || "Failed to remove from cart.");
    } finally {
      setLoadingCart(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    if (!user || !user._id) {
      toast.error("Please log in to modify your cart.");
      return;
    }

    setLoadingCart(true);
    try {
      const { data } = await api.put(`/api/cart/${productId}`, { quantity });
      setCart(data);
      toast.success(`Cart item quantity updated!`);
    } catch (error) {
      console.error("Error updating cart item:", error);
      toast.error(error.response?.data?.message || "Failed to update cart item.");
    } finally {
      setLoadingCart(false);
    }
  };

  const clearCart = async () => {
    if (!user || !user._id) {
      toast.error("Please log in to clear your cart.");
      return;
    }

    setLoadingCart(true);
    try {
      const { data } = await api.delete('/api/cart');
      setCart(data);
      toast.success('Cart cleared!');
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error(error.response?.data?.message || "Failed to clear cart.");
    } finally {
      setLoadingCart(false);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItem, clearCart, loadingCart }}>
      {children}
    </CartContext.Provider>
  );
};
