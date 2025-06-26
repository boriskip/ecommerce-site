import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
            <p className="text-gray-600 mb-6">
                Your visited page not found. You may go home page.
            </p>
            <Link to="/">
                <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                    Back to home page
                </button>
            </Link>
        </section>
    );
}
