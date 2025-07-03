// src/pages/auth/LogIn.jsx
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import axiosPrivate from "../api/axiosPrivate";
import { useAuth } from "@/context/AuthContext";



export default function LogIn() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await axiosPrivate.get("/sanctum/csrf-cookie");

            const res = await axiosPrivate.post("/api/login", form);

            console.log("✅ Login successful:", res.data);
            localStorage.setItem("user", JSON.stringify(res.data));

            const userRes = await axiosPrivate.get("/api/user");
            setUser(userRes.data);

            navigate("/account/profile");
        } catch (err) {
            console.error("❌ Ошибка при входе:", err.response?.data || err);
            setError("Неверный email или пароль");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w">
            <section className="max-w-7xl mx-auto px-4 py-12 grid grid-col-1 md:grid-cols-2 gap-10 items-center">
                <div>
                    <img
                        src="public/singup-in/dl.beatsnoop 1.png"
                        alt="Shopping with phone"
                        className="w-full h-auto object-contain"
                    />
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">Log In To Exclusive</h2>
                    <p className="text-sm text-gray-500 mb-6">Enter your details below</p>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="border px-4 py-2 rounded"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="border px-4 py-2 rounded"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black text-white py-2 rounded hover:bg-gray-800"
                        >
                            {loading ? "Входим..." : "Login"}
                        </button>

                        <p className="text-sm text-center">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-black underline">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </section>
        </section>
    )
}