'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IphoneAccessory, iphoneAccessories } from '@/lib/products';
import { Header } from '@/components/header';
import { AddToCart } from '@/components/add-to-cart';
import { ProductImage } from '@/components/product-image';

export default function IphoneAccessoriesPage() {
  const [selectedAccessory, setSelectedAccessory] = useState<IphoneAccessory | null>(null);
  const [_, startTransition] = useTransition();

  const handleAccessoryClick = (accessory: IphoneAccessory) => {
    startTransition(() => {
      setSelectedAccessory(accessory);
      window.history.pushState(null, '', `/a/${accessory.id}`);
    });
  };

  const handleBack = useCallback(() => {
    startTransition(() => {
      setSelectedAccessory(null);
      window.history.pushState(null, '', '/');
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedAccessory) {
        if (event.key === 'Escape') {
          handleBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedAccessory, handleBack]);

useEffect(() => {
    const handlePopState = () => {
      const accessoryId = window.location.pathname.split('/').pop();
      if (accessoryId && accessoryId  !== '' ) {
        const accessory = iphoneAccessories.find((a) => a.id === accessoryId);
        if(accessory){
          setSelectedAccessory(accessory);
        }
        } else {
        setSelectedAccessory(null);
      }
      
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header isBackVisible={!!selectedAccessory} onBack={handleBack} />
      <main className="flex-grow relative pt-12">
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-x-5 gap-y-12 pb-8"
          animate={{ opacity: selectedAccessory ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {iphoneAccessories.map((accessory, index) => (
            <div
              key={`${accessory.id}-${index}`}
              className="group cursor-pointer"
              onClick={() => handleAccessoryClick(accessory)}
            >
              <ProductImage
                product={accessory}
                layoutId={`product-image-${accessory.id}`}
              />
              <p className="font-medium text-center font-mono uppercase">
                {accessory.id.split('-').slice(0, -1).join('-')}
              </p>
              <p className="text-sm text-center font-medium mt-2">
                ${accessory.price.toFixed(2)}
              </p>
            </div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedAccessory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex flex-col items-center justify-between bg-white bg-opacity-90"
              style={{
                top: '0',
                height: 'calc(100vh - 80px - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
                paddingTop: 'calc(20px + env(safe-area-inset-top))',
                paddingBottom: '0',
              }}
            >
              <div className="w-full max-w-4xl mx-auto flex-grow flex flex-col items-center justify-center p-4">
                <ProductImage
                  product={selectedAccessory}
                  maxWidth="100%"
                  maxHeight="calc(100vh - 250px - env(safe-area-inset-top) - env(safe-area-inset-bottom))"
                  className="w-full"
                  layoutId={`product-image-${selectedAccessory.id}`}
                />
              </div>

              <motion.div
                className="w-full max-w-md mx-auto p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <p className="text-xl text-center font-medium">{selectedAccessory.name}</p>
                <p className="text-sm text-center text-gray-600 mt-3">
                  {selectedAccessory.description}
                </p>
                <AddToCart product={selectedAccessory} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
