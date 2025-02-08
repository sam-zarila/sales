// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Loader2 } from "lucide-react";

// const Checkout = () => {
//   const searchParams = useSearchParams();
//   const total = searchParams.get("total") || "0"; // Get total from URL
//   const [loading, setLoading] = useState(false);
//   const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

//   const handlePayment = async () => {
//     setLoading(true);
  
//     try {
//       const response = await fetch("https://paychangu.com/api/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: total,
//           currency: "MWK",
//           api_key: "PUB-TEST-AbWMbCkKpMwbmHRDVPeg4oUwh55mkh1Z",
//         }),
//         mode: 'no-cors'  // Set CORS mode to 'no-cors'
//       });
  
//       // 'no-cors' mode doesn't allow access to response body, so handling it will be tricky
//       // You can only check if the request was successful using status
//       if (response.ok) {
//         // Assuming the response contains a checkout URL directly accessible in 'location' header or similar.
//         window.location.href = response.headers.get('Location') || "";  // Handle redirect using Location header
//       } else {
//         console.error("Invalid response from PayChangu");
//       }
//     } catch (error) {
//       console.error("Error processing payment:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Checkout</h2>
//         <p className="text-gray-600 mb-2">You are about to pay:</p>
//         <p className="text-2xl font-bold">MWK {total}</p>

//         <div className="mt-6">
//           <button
//             className="w-full bg-black text-white rounded-md py-2 flex justify-center items-center"
//             onClick={handlePayment}
//             disabled={loading}
//           >
//             {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Proceed to Payment"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
