'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Minus, Plus } from 'lucide-react';
import { useCart } from './cart-context';
import { CLOTHING_SIZES, IPHONE_SIZES } from './add-to-cart';
import { useRouter } from 'next/navigation';

interface SizeOption {
  label: string;
  value: number;
}

export function Cart({ isOpen, onClose }: { isOpen: boolean; onClose: any }) {
  const { items, updateQuantity, total } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    location: '',
    courier_service: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');

    // Perform any extra validation if necessary

    // Redirect to your payment gateway (update URL as needed)
    router.push('/payment-gateway');
    setLoading(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {/* Increase the width to accommodate two columns */}
      <SheetContent className="w-full sm:max-w-6xl p-0 absolute right-0 top-0 h-full">
        <SheetTitle className="sr-only">Cart</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="flex flex-1 overflow-auto">
            {/* Left Column: Order Details Form */}
            <div className="w-1/3 border-r p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Delivery Information
              </h1>
              <form
                id="order-details-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    placeholder="Sam Zarila"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="zarilasam99@gmail.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    placeholder="+265 XXX XXX XXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Soche, Blantyre"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Courier Service
                  </label>
                  <select
                    name="courier_service"
                    value={formData.courier_service}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  >
                    <option value="">Select a courier service</option>
                    <option value="cts">CTS</option>
                    <option value="speed">SPEED</option>
                    <option value="self_pickup">Self Pickup</option>
                  </select>
                </div>
                {formError && (
                  <p className="text-red-500 text-sm">{formError}</p>
                )}
                {/* The form doesn't include its own submit button */}
              </form>
            </div>
            {/* Right Column: Cart Items and Total Cost */}
            <div className="flex-1 py-6 px-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Your Cart
              </h2>
              {items.map((item) => {
                const sizes = item.id.includes('iphone')
                  ? IPHONE_SIZES
                  : CLOTHING_SIZES;
                return (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 py-6 border-b"
                  >
                    <div className="relative aspect-square h-[120px] bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                        loading="eager"
                        decoding="sync"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-1">
                      <div className="space-y-1">
                        {/* Display product code and item name */}
                        <p className="font-mono uppercase text-sm">
                          {item.id.split('-').slice(0, -1).join('-')}
                        </p>
                        <p className="font-mono text-sm">{item.name}</p>
                        <p className="font-mono">
                          MK
                          {item.id.startsWith('sk')
                            ? item.id.includes('gray')
                              ? '40'
                              : '20'
                            : '20'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-sm">SIZE</p>
                          <p className="font-mono text-sm">
                            {typeof sizes[item.size as keyof typeof sizes] ===
                              'object' &&
                            (sizes[item.size as keyof typeof sizes] as SizeOption)
                              ?.label
                              ? (sizes[item.size as keyof typeof sizes] as SizeOption)
                                  .label
                              : 'N/A'}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-sm">QTY</p>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              className="p-1"
                              onClick={() =>
                                updateQuantity(item.id, item.size, -1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-mono">{item.quantity}</span>
                            <button
                              type="button"
                              className="p-1"
                              onClick={() =>
                                updateQuantity(item.id, item.size, 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* Total cost displayed below the items */}
              <div className="mt-4 border-t pt-4">
                <p className="font-mono text-lg font-bold">Total: MK{total}</p>
              </div>
            </div>
          </div>
          {/* Bottom area with a continue button that submits the order details form */}
          <div className="border-t p-8">
            <p className="font-mono text-sm text-muted-foreground">
              TAX AND SHIPPING NOT INCLUDED
            </p>
            <button
              type="submit"
              form="order-details-form"
              disabled={loading}
              className="w-full flex items-center justify-center bg-black text-white py-3 rounded-md"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </div>
              ) : (
                'CONTINUE'
              )}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
