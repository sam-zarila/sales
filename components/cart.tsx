import Image from 'next/image';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { ChevronRight, Minus, Plus } from 'lucide-react';
import { useCart } from './cart-context';
import { CLOTHING_SIZES, IPHONE_SIZES } from './add-to-cart'; // Import dynamic sizes based on product type
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { emitWarning } from 'process';

interface SizeOption {
  label: string;
  value: number;
}

export function Cart({ isOpen, onClose }: { isOpen: boolean; onClose: any }) {
  const { items, updateQuantity, total } = useCart();
  const router = useRouter()
  const [loading, setLoading]= useState(false)


  async function handleCheckout() {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/payments/pay',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount:total,
          currency:'MWK',
          email:'zarilasam99@gmail.com',
          tx_ref: `tx-${Date.now()}`,
          phone_number: '+265987654321', 
          name:'sam zarila',

        }),

      });

      const data = await response.json();

      if (response.ok && data?.data?.checkout_url) {
        // Redirect to the payment gateway
        router.push(data?.data?.checkout_url);
        
      } else {
        alert('Payment initiation failed')
        
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred while processing payment.');
      
    } finally{
      setLoading(false)
    }

    
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md border-l-0 p-0 [&_button[aria-label=Close]]:size-12 absolute right-0 top-0 h-full">
        <SheetTitle className="sr-only">Cart</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-auto py-6 px-8">
            {items.map((item) => {
              // Dynamically select the sizes based on the item type (product)
              const sizes = item.id.includes('iphone') ? IPHONE_SIZES : CLOTHING_SIZES;

              return (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 py-6 first:pt-0"
                >
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
                      <p className="font-mono uppercase text-sm">
                        {item.id.split('-').slice(0, -1).join('-')}
                      </p>
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
                          {typeof sizes[item.size as keyof typeof sizes] === 'object' &&
                          (sizes[item.size as keyof typeof sizes] as SizeOption)?.label
                            ? (sizes[item.size as keyof typeof sizes] as SizeOption).label
                            : 'N/A'}
                        </p>
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
                </div>
              );
            })}
          </div>
          <div className="border-t">
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-mono uppercase">Total</p>
                <p className="font-mono">mk{total}</p>
              </div>
              <p className="font-mono text-sm text-muted-foreground">
                TAX AND SHIPPING NOT INCLUDED
              </p>
              <button
               onClick={handleCheckout}
               className="w-full flex items-center justify-center bg-black text-white py-3 rounded-md"
               disabled={loading}
              >
                   {loading ? 'Processing...' : 'CONTINUE'}
                   <ChevronRight className="h-4 w-4 ml-2" />
              </button>
             
             
                <ChevronRight className="h-4 w-4" />
             
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
// import Image from 'next/image';
// import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
// import { ChevronRight, Minus, Plus } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useCart } from './cart-context';

// export function Cart({ isOpen, onClose }: { isOpen: boolean; onClose: any }) {
//   const { items, updateQuantity, total } = useCart();
//   const router = useRouter();

//   const handleCheckout = () => {
//     if (total > 0) {
//       router.push(`/checkout?total=${total}`);
//     }
//   };

//   return (
//     <Sheet open={isOpen} onOpenChange={onClose}>
//       <SheetContent className="w-full sm:max-w-md border-l-0 p-0 [&_button[aria-label=Close]]:size-12 absolute right-0 top-0 h-full">
//         <SheetTitle className="sr-only">Cart</SheetTitle>
//         <div className="flex flex-col h-full">
//           <div className="flex-1 overflow-auto py-6 px-8">
//             {items.length === 0 ? (
//               <p className="text-gray-500 text-center">Your cart is empty.</p>
//             ) : (
//               items.map((item) => (
//                 <div key={item.id} className="flex gap-4 py-6 first:pt-0">
//                   <div className="relative aspect-square h-[120px] bg-[#FFFFFF]">
//                     <Image
//                       src={item.image}
//                       alt={item.name}
//                       fill
//                       className="object-contain"
//                       loading="eager"
//                       decoding="sync"
//                     />
//                   </div>
//                   <div className="flex flex-col justify-between py-1 flex-1">
//                     <div className="space-y-1">
//                       <p className="font-mono uppercase text-sm">{item.name}</p>
//                       <p className="font-mono">MK {item.price}</p>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <p className="font-mono text-sm">QTY</p>
//                       <div className="flex items-center gap-4">
//                         <button
//                           className="p-1"
//                           onClick={() => updateQuantity(item.id, item.size, -1)}
//                         >
//                           <Minus className="h-3 w-3" />
//                         </button>
//                         <span className="font-mono">{item.quantity}</span>
//                         <button
//                           className="p-1"
//                           onClick={() => updateQuantity(item.id, item.size, 1)}
//                         >
//                           <Plus className="h-3 w-3" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {items.length > 0 && (
//             <div className="border-t p-8 space-y-4">
//               <div className="flex justify-between items-center">
//                 <p className="font-mono uppercase">Total</p>
//                 <p className="font-mono">MK {total}</p>
//               </div>
//               <p className="font-mono text-sm text-muted-foreground">
//                 TAX AND SHIPPING NOT INCLUDED
//               </p>

//               <button
//                 onClick={handleCheckout}
//                 className="w-full bg-black text-white flex items-center justify-center rounded-md py-2"
//               >
//                 CONTINUE
//                 <ChevronRight className="h-4 w-4 ml-2" />
//               </button>
//             </div>
//           )}
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }
