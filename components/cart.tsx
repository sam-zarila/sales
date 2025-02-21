
import Image from 'next/image';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { ChevronRight, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from './cart-context';
import { useEffect } from 'react';
import { publicDecrypt } from 'crypto';



declare global {
  interface Window{
    paychanguCheckout:(Config:any) => void;
  }
}

export function Cart({ isOpen, onClose }: { isOpen: boolean; onClose: any }) {
  const { items, updateQuantity, total } = useCart();
  const router = useRouter();

  useEffect(() =>{
    const script = document.createElement('script');
    script.src = 'https://paychangu.com/paychangu.js';
    script.async = true;
    document.body.appendChild(script);

    return ( )=>{
      document.body.removeChild(script);
    }
  },[]);

  const handlePayment = () => {
    if (typeof window.paychanguCheckout === 'function') {
      window.paychanguCheckout({
        public_key: "pub-test-Z2fK1oH31qEvBjtf7FnBhp6CtMZ0vpMW",
        tx_ref: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        amount: total,
        currency: "MWK",
        callback_url: `${window.location.origin}/api/payment-callback`,
        return_url: "",
        customer: {
          email: "zarilasam99@gmail.com",
          first_name: "Cust",
          last_name: "Name",
        },
        customization: {
          title: "Complete Your Purchase",
          description: "Payment for items in cart",
        }
        meta: {
          order_id: `order-${Date.now()}`,
          items: items.length.toString()
        }
      });
    }
  };



  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md border-l-0 p-0 [&_button[aria-label=Close]]:size-12 absolute right-0 top-0 h-full">
        <SheetTitle className="sr-only">Cart</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-auto py-6 px-8">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 py-6 first:pt-0">
                  <div className="relative aspect-square h-[120px] bg-[#FFFFFF]">
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
                      <p className="font-mono uppercase text-sm">{item.name}</p>
                      <p className="font-mono">MK {item.price}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm">QTY</p>
                      <div className="flex items-center gap-4">
                        <button
                          className="p-1"
                          onClick={() => updateQuantity(item.id, item.size, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-mono">{item.quantity}</span>
                        <button
                          className="p-1"
                          onClick={() => updateQuantity(item.id, item.size, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t p-8 space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-mono uppercase">Total</p>
                <p className="font-mono">MK {total}</p>
              </div>
              <p className="font-mono text-sm text-muted-foreground">
                TAX AND SHIPPING NOT INCLUDED
              </p>

              <button
                onClick={handlePayment}
               
                className="w-full bg-black text-white flex items-center justify-center rounded-md py-2"
              >
                CONTINUE
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
