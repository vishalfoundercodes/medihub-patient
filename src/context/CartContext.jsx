import { createContext, useContext, useState } from 'react';
import { medicines as allMedicines } from '../data/medicinesData';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const addToCart = (medicine) => {
    setCart((prev) => ({ ...prev, [medicine.id]: (prev[medicine.id] || 0) + 1 }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const qty = (prev[id] || 0) - 1;
      if (qty <= 0) { const next = { ...prev }; delete next[id]; return next; }
      return { ...prev, [id]: qty };
    });
  };

  const clearCart = () => setCart({});

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const med = allMedicines.find((m) => m.id === Number(id));
    return sum + (med ? med.price * qty : 0);
  }, 0);

  const getQty = (id) => cart[id] || 0;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal, getQty }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
