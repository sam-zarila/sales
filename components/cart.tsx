'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Minus, Plus } from "lucide-react";
import { useCart } from "./cart-context";
import { CLOTHING_SIZES, IPHONE_SIZES } from "./add-to-cart";
import { useRouter } from "next/navigation";

interface SizeOption {
  label: string;
  value: number;
}

export function Cart({ isOpen, onClose }: { isOpen: boolean; onClose: any }) {
  const { items, updateQuantity, total } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    location: "",
    courier_service: "",
  });

  useEffect(() => {
    // Load payment gateway scripts
    const loadScript = (src: string) =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

    loadScript("https://code.jquery.com/jquery-3.6.0.min.js")
      .then(() => loadScript("https://in.paychangu.com/js/popup.js"))
      .catch((err) => console.error("Script loading failed:", err));

    return () => {
      document
        .querySelectorAll("script[src*='jquery'], script[src*='paychangu']")
        .forEach((script) => document.body.removeChild(script));
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!window.PaychanguCheckout) {
      setFormError("Payment gateway is still loading. Please wait.");
      return;
    }

    setLoading(true);
    setFormError("");

    window.PaychanguCheckout({
      public_key: "PUB-TEST-PjxBxGsX32OVbBJbRJHFhwXwOOa9snAC", // Replace with your public key
      tx_ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      amount: total.toString(),
      currency: "MWK",
      callback_url: "https://yourdomain.com/order-confirmation", // Replace with your callback URL
      customer: {
        email: formData.email,
        first_name: formData.full_name.split(" ")[0],
        last_name: formData.full_name.split(" ").slice(1).join(" "),
      },
      customization: {
        title: "Cart Payment",
        description: "Payment for your order",
      },
      meta: {
        courier: formData.courier_service,
        location: formData.location,
        cartItems: items.map((item) => item.name).join(", "),
      },
    });

    setLoading(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {/* Main modal container */}
      <SheetContent className="w-full sm:max-w-6xl p-0 absolute right-0 top-0 h-full">
        <SheetTitle className="sr-only">Cart</SheetTitle>
        <div className="flex flex-col h-full">
          {/* Container adapts: on mobile (default) items are on top; on md+ the layout is two columns */}
          <div className="flex flex-col md:flex-row flex-1 overflow-auto">
            {/* Cart Items: order-1 on mobile (top) and order-2 on md+ (right) */}
            <div className="order-1 md:order-2 flex-1 py-6 px-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Cart</h2>
              {items.map((item) => {
                const sizes = item.id.includes("iphone")
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
                        <p className="font-mono uppercase text-sm">
                          {item.id.split("-").slice(0, -1).join("-")}
                        </p>
                        <p className="font-mono text-sm">{item.name}</p>
                        <p className="font-mono">
                          MK
                          {item.id.startsWith("sk")
                            ? item.id.includes("gray")
                              ? "40"
                              : "20"
                            : "20"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-sm">SIZE</p>
                          <p className="font-mono text-sm">
                            {typeof sizes[item.size as keyof typeof sizes] ===
                            "object" &&
                            (sizes[item.size as keyof typeof sizes] as SizeOption)
                              ?.label
                              ? (sizes[item.size as keyof typeof sizes] as SizeOption)
                                  .label
                              : "N/A"}
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
              <div className="mt-4 border-t pt-4">
                <p className="font-mono text-lg font-bold">Total: MK{total}</p>
              </div>
            </div>
            {/* Delivery Form: order-2 on mobile (bottom) and order-1 on md+ (left) */}
            <div className="order-2 md:order-1 w-full md:w-1/3 border-t md:border-t-0 md:border-r p-8">
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
                    placeholder="yourname@example.com"
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
              </form>
            </div>
          </div>
          {/* Continue Button */}
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
                "CONTINUE"
              )}
            </button>
          </div>
        </div>
      </SheetContent>
      {/* Required element for Paychangu payment iframe */}
      <div id="wrapper"></div>
    </Sheet>
  );
}
