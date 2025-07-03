import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axiosPublic from "../api/axiosPublick";
import axiosPrivate from "../api/axiosPrivate";
import { useAuth } from "@/context/AuthContext";


export default function SignUp() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await axiosPublic.get("/sanctum/csrf-cookie");

            // Регистрация
            await axiosPublic.post("/api/register", form);

            // Логин
            await axiosPublic.post("/api/login", {
                email: form.email,
                password: form.password,
            });

            // Получить данные пользователя
            const resUser = await axiosPrivate.get("/api/user");
            setUser(resUser.data);

            console.log("✅ Успешная регистрация + вход:", resUser.data);
            navigate("/account/profile");
        } catch (error) {
            setError(error?.response?.data?.message || "Ошибка при регистрации");
            console.error("❌ Ошибка:", error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="max-w-7xl mx-auto px-4 py-12 grid grid-col-1 md:grid-cols-2 gap-10 items-center">
            <div>
                <img
                    src="public/singup-in/dl.beatsnoop 1.png"
                    alt="Shopping with phone"
                    className="w-full h-auto object-contain"
                />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">Create an account</h2>
                <p className="text-sm text-gray-500 mb-6">Enter your details below</p>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        className="border px-4 py-2 rounded"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border px-4 py-2"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border px-4 py-2 rounded"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="border px-4 py-2 rounded"
                        value={form.password_confirmation}
                        onChange={(e) =>
                            setForm({ ...form, password_confirmation: e.target.value })
                        }
                        required
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                        {loading ? "Регистрация..." : "Create Account"}
                    </button>
                </form>
            </div>
        </section>
    );
}