'use client';

import React, { createContext, useState, useCallback, useContext } from 'react';
import { Product, IphoneAccessory } from '@/lib/products'; // Ensure your product and accessory data are imported

interface CartItem extends Product, IphoneAccessory {
  quantity: number;
  size: string;
  price: number;
  description: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product | IphoneAccessory, size: string) => void;
  updateQuantity: (id: string, size: string, change: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add item to cart with appropriate size
  const addToCart = useCallback((product: Product | IphoneAccessory, size: string) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      // Create a new CartItem by spreading product and adding missing properties
      const itemToAdd: CartItem = {
        ...product,
        quantity: 1,
        size,
        // Ensure all required properties from CartItem are included
        price: 'price' in product ? product.price : 0, // Assuming price exists in both Product and IphoneAccessory
        description: 'description' in product ? product.description : '', // Assuming description exists in both Product and IphoneAccessory
      };

      if (existingItemIndex > -1) {
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, itemToAdd];
      }
    });
  }, []);

  // Update quantity of item in cart
  const updateQuantity = useCallback(
    (id: string, size: string, change: number) => {
      setItems((prevItems) =>
        prevItems.reduce((acc, item) => {
          if (item.id === id && item.size === size) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0
              ? [...acc, { ...item, quantity: newQuantity }]
              : acc;
          }
          return [...acc, item];
        }, [] as CartItem[] )
      );
    },
    []
  );

  // Calculate total cost with dynamic pricing logic
  const total = items.reduce((acc, item) => {
    let price = 0;

    // Check if it's an iPhone accessory or clothing
    if ('sizeOptions' in item) {
      // iPhone accessory pricing
      price = item.price || 0;
    } else {
      // Clothing item pricing
      price = item.price || 0;
    }

    return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
