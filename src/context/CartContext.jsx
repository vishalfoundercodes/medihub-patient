import { createContext, useContext, useState, useEffect } from 'react';
import { addToCartAPI, getCartAPI } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Local qty map — { [item_id]: qty } — for instant UI
  const [cart, setCart] = useState({});

  // Full cart items from API — array of cart objects with name, image, price etc.
  const [apiCart, setApiCart] = useState([]);
  const [summary, setSummary] = useState(null);
  const [labSlots, setLabSlots] = useState({});
  const [cartLoading, setCartLoading] = useState(false);

  const { token } = useAuth();

  // ── Fetch cart from API whenever token changes (login/logout) ──
  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      // User logged out — clear everything
      setCart({});
      setApiCart([]);
      setSummary(null);
    }
  }, [token]);

  const fetchCart = async () => {
    setCartLoading(true);
    try {
      const res = await getCartAPI();
      if (res.success) {
        const items = res.data.cart;
        const sum   = res.data.summary;

        // Sync local qty map from API response
        const qtyMap = {};
        items.forEach((item) => { qtyMap[item.item_id] = item.quantity; });

        setCart(qtyMap);
        setApiCart(items);
        setSummary(sum);
        setLabSlots(res.data.lab_test_slots || {});
      }
    } catch (err) {
      console.error('[Cart] fetchCart failed:', err?.response?.data || err.message);
    } finally {
      setCartLoading(false);
    }
  };

  /**
   * addToCart — optimistic update + API call
   * @param {object} item  — item object { id, type, name, price ... }
   * @param {string} type  — 'medicine' | 'test' | 'doctor' (auto from item.type)
   */
  const addToCart = async (item, type) => {
    const itemType = type || item.type || 'medicine';
    const itemId   = item.id;

    // 1️⃣ Optimistic update — instant UI
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    // 2️⃣ API call only if logged in
    if (!token) return;

    try {
      await addToCartAPI({ type: itemType, item_id: itemId, quantity: 1 });
      // Refresh full cart from API to keep apiCart + summary in sync
      await fetchCart();
    } catch (err) {
      console.error('[Cart] addToCart API failed:', err?.response?.data || err.message);
      // 3️⃣ Rollback on failure
      setCart((prev) => {
        const qty = (prev[itemId] || 0) - 1;
        if (qty <= 0) { const next = { ...prev }; delete next[itemId]; return next; }
        return { ...prev, [itemId]: qty };
      });
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const qty = (prev[id] || 0) - 1;
      if (qty <= 0) { const next = { ...prev }; delete next[id]; return next; }
      return { ...prev, [id]: qty };
    });
  };

  const clearCart = () => {
    setCart({});
    setApiCart([]);
    setSummary(null);
    setLabSlots({});
  };

  // Derived values from local cart (for instant UI)
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = summary?.total_amount ?? Object.entries(cart).reduce((sum, [, qty]) => sum + qty, 0);
  const getQty    = (id) => cart[id] || 0;

  return (
    <CartContext.Provider value={{
      cart, apiCart, summary, labSlots, cartLoading,
      addToCart, removeFromCart, clearCart,
      cartCount, cartTotal, getQty,
      fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
