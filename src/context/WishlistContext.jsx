import { createContext, useContext, useState } from 'react';
import api, { apis } from '../utlities/api';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  // wishlistedIds: Set of "type_itemId" strings for O(1) lookup
  const [wishlistedIds, setWishlistedIds] = useState(new Set());

  const isWishlisted = (itemId, type) => wishlistedIds.has(`${type}_${itemId}`);

  const toggleWishlist = async (item) => {
    // item must have: { id (item_id), category (type) }
    const type = item.category || item.type;
    const item_id = item.id || item.item_id;
    const key = `${type}_${item_id}`;

    // Optimistic update
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

    try {
      await api.post(apis.wishlistToggle, { type, item_id });
    } catch {
      // Revert on failure
      setWishlistedIds((prev) => {
        const next = new Set(prev);
        next.has(key) ? next.delete(key) : next.add(key);
        return next;
      });
    }
  };

  return (
    <WishlistContext.Provider value={{ isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
