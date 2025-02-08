import { useRouter } from "next/router"
import { useState } from "react";


const  checkOut = () => {
    const router = useRouter();

    const {total} = router.query;
    const [loading, setLoading] = useState(false);

    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
}