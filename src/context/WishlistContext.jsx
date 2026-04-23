import { createContext, useContext, useState } from 'react';
import labHero from '../assets/Home/labHero.png';
import doctorImg from '../assets/Home/doctorHero.png';

const WishlistContext = createContext(null);

const DUMMY_ITEMS = [
  {
    id: 1, name: 'Full Body Checkup', category: 'test',
    image: labHero, price: 999, original: 1499, discount: 20,
    includes: 'Includes 70+ Tests',
  },
  {
    id: 3, name: 'Thyroid Profile', category: 'test',
    image: labHero, price: 649, original: 899, discount: 15,
    includes: 'Includes T3, T4, TSH',
  },
  {
    id: 1, name: 'Crocin 650mg Tablet', category: 'medicine',
    image: labHero, price: 120, original: 150, discount: 20,
    strip: 'Strip of 15 Tablets',
  },
  {
    id: 3, name: 'Dolo 650mg Tablet', category: 'medicine',
    image: labHero, price: 135, original: 150, discount: 10,
    strip: 'Strip of 15 Tablets',
  },
  {
    id: 2, name: 'Dr. Priya Sharma', category: 'doctor',
    image: doctorImg, specialty: 'Gynecologist', experience: 10,
    rating: 4.9, reviews: 980, fee: 599,
  },
  {
    id: 5, name: 'Dr. Saurabh Mehta', category: 'doctor',
    image: doctorImg, specialty: 'Cardiologist', experience: 15,
    rating: 4.9, reviews: 760, fee: 799,
  },
];

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(DUMMY_ITEMS);

  const addToWishlist = (item) => {
    setItems((prev) =>
      prev.find((i) => i.id === item.id && i.category === item.category)
        ? prev
        : [...prev, item]
    );
  };

  const removeFromWishlist = (id, category) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.category === category)));
  };

  const isWishlisted = (id, category) =>
    items.some((i) => i.id === id && i.category === category);

  const toggleWishlist = (item) => {
    isWishlisted(item.id, item.category)
      ? removeFromWishlist(item.id, item.category)
      : addToWishlist(item);
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
