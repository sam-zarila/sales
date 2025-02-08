import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Loader2 } from 'lucide-react';

const Checkout = () => {
  const router = useRouter();
  const { total } = router.query; // Get total from query params
  const [loading, setLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    if (total) {
      // Simulate fetching a PayChangu checkout link
      const payChanguUrl = `https://paychangu.com/pay?amount=${total}&currency=MWK&api_key=PUB-TEST-AbWMbCkKpMwbmHRDVPeg4oUwh55mkh1Z`;
      setCheckoutUrl(payChanguUrl);
    }
  }, [total]);

  const handlePayment = () => {
    if (!checkoutUrl) return;
    setLoading(true);
    setTimeout(() => {
      window.location.href = checkoutUrl; // Redirect to PayChangu
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>
        <p className="text-gray-600 mb-2">You are about to pay:</p>
        <p className="text-2xl font-bold">MWK {total}</p>

        <div className="mt-6">
          <button
             className="w-full bg-black text-white rounded-md py-2 flex justify-center items-center"
             onClick={handlePayment}
             disabled={loading}
          
          >
              {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : 'Proceed to Payment'}

          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
