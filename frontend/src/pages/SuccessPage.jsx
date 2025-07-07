import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../api/axiosPrivate";
import toast from "react-hot-toast";


export default function SuccessPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const completeOrder = async () => {
            try {
                const res = await axiosPrivate.post("/api/orders/complete-checkout");
                toast.success("🎉 Payment successful! Order confirmed.");
                navigate("/success", { replace: true });
            } catch (err) {
                console.error("❌ Failed to complete order:", err);
                toast.error("Something went wrong completing the order.");
                navigate("/", { replace: true });
            }
        };

        completeOrder();
    }, [navigate]);

    return (
        <section className="min-h-[50vh] flex items-center justify-center flex-col text-center">
            <h1 className="text-3xl font-bold mb-4">Thank you for purchase</h1>
            <p className="text-gray-600 ">Redirecting to your orders...</p>
        </section>
    );
}