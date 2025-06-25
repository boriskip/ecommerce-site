import React from "react";

export default function SingUp() {
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

        <form className="flex flex-col gap-4">
            <input
            type="text"
            placeholder="Name"
            className="border px-4 py-2 rounded"
            />
            <input 
            type="email"
            placeholder="Email"
            className="border px-4 py-2"
            />
            <input
            type="password"
            placeholder="Password"
            className="border px-4 py-2 rounded"
            />
            <button
            type="submit"
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600">
                Create Account
            </button>

            <button
            
            type="button"
            
            className="border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100">
                <img
    src="public/singup-in/google.png" 
    alt="Google icon"
    className="w-55 h-5"
  />
            </button>

            <p className="text-sm text-conter">
                Already have account?{' '}
                <a href="/login" className="text-black underline">Log in</a>
            </p>
        </form>
    </div>
</section>
    );
}