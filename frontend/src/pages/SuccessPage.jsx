import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../api/axiosPrivate";
import useCart from '../hooks/useCart';
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";


export default function SuccessPage() {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const hasRun = useRef(false);
    const [searchParams] = useSearchParams();


    useEffect(() => {
        const sessionId = searchParams.get("session_id"); // ✅ session_id из URL
        if (!sessionId) {
            toast.error("Missing Stripe session ID");
            return;
        }
        if (hasRun.current) return;
        hasRun.current = true;

        const completeOrder = async () => {
            try {
                const res = await axiosPrivate.post("/api/orders/complete-checkout", { session_id: sessionId, });
                clearCart();
                toast.success("🎉 Payment successful! Order confirmed.");

                setTimeout(() => {
                    navigate("/account/orders", { replace: true });
                }, 2000);
            } catch (err) {
                console.error("❌ Failed to complete order:", err);
                toast.error("Something went wrong completing the order.");
                navigate("/", { replace: true });
            }
        };

        completeOrder();
    }, [searchParams]);

    return (
        <section className="min-h-[50vh] flex items-center justify-center flex-col text-center">
            <h1 className="text-3xl font-bold mb-4">Thank you for purchase</h1>
            <p className="text-gray-600 ">Redirecting to your orders...</p>
        </section>
    );
}