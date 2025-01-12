'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cart } from '@/components/cart';
import { type Product, IphoneAccessory } from '@/lib/products';
import { useCart } from './cart-context';

export const CLOTHING_SIZES = [
  { label: 'S-M', value: 0 },
  { label: 'M-L', value: 1 },
  { label: 'XL-XXL', value: 2 },
];

export const IPHONE_SIZES = [
  { label: 'iPhone Normal', value: 0 },
  { label: 'iPhone Pro', value: 1 },
  { label: 'iPhone Pro Max', value: 2 },
];

// Type guard to differentiate between Product and IphoneAccessory
function isIphoneAccessory(product: Product | IphoneAccessory): product is IphoneAccessory {
  return (product as IphoneAccessory).sizeOptions !== undefined;
}

export function AddToCart({ product }: { product: Product | IphoneAccessory }) {
  const [isSelectingSize, setIsSelectingSize] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useCart();

  // Select sizes based on product type
  const sizes = isIphoneAccessory(product) ? IPHONE_SIZES : CLOTHING_SIZES;

  const handleAddToCart = useCallback(
    (sizeValue: number) => {
      addToCart(product, String(sizeValue)); // Convert sizeValue to string
      setIsSelectingSize(false);
      setIsCartOpen(true);
    },
    [addToCart, product]
  );

  // Display product name without size info from the ID
  const productName = product.id.split('-').slice(0, -1).join('-').toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full max-w-[320px] mx-auto">
        <motion.div className="flex flex-col items-center" initial={false}>
          <motion.div className="h-8 relative w-full flex justify-center items-center overflow-hidden">
            <motion.p className="font-medium font-mono uppercase absolute inset-0 flex items-center justify-center">
              {productName}
            </motion.p>
          </motion.div>

          <motion.div className="mt-8 relative w-full h-12">
            <motion.button
              onClick={() => setIsSelectingSize(true)}
              className="size-12 flex items-center justify-center bg-white absolute left-1/2 -translate-x-1/2"
              aria-label="Select size"
              aria-expanded={isSelectingSize}
            >
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </motion.button>

            <AnimatePresence>
              {isSelectingSize && (
                <motion.div className="flex justify-between w-full absolute top-0 left-0">
                  {sizes.map((size) => (
                    <motion.button
                      key={size.value}
                      onClick={() => handleAddToCart(size.value)}
                      className="w-16 h-12 bg-transparent hover:bg-black hover:text-white transition-colors font-mono text-sm font-semibold"
                    >
                      {size.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.div>
  );
}
