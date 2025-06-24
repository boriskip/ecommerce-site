import React from "react";  

export default function LogIn() {
    return (
        <section className="w">
<section className="max-w-7xl mx-auto px-4 py-12 grid grid-col-1 md:grid-cols-2 gap-10 items-center">
    <div>
        <img
        src="public/singup-in/dl.beatsnoop 1.png"
        alt="Shoppung with phone"
        className="w-full h-auto object-contain"
        />
    </div>

    <div>
        <h2 className="text-2xl font-bold mb-2">Log In To Exclusive</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your details below</p>

        <form className="flex flex-col gap-4">
            <input 
            type="email"
            placeholder="Email or Phone Number"
            className="border-b border-gray-300 focus:outline-none focus:border-black px-1 py-2"
            />
            <input
            type="password"
            placeholder="Password"
            className="border-b border-gray-300 focus:outline-none focus:border-black px-1 py-2"
            />
            <button
            type="submit"
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600">
                Log In
            </button>


             <a
              href="/forget-password"
              className="text-sm text-red-500 hover:underline"
            >
              Forgot Password?
            </a>
        </form>
    </div>
</section>
        </section>
    )
}