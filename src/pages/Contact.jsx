import React from "react";
import { Phone, Mail } from "lucide-react";

export default function Contact() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
            {/* Контакты слева */}
            <div className="bg-white p-6 rounded shadow space-y-6">
                {/* Call */}
                <div className="flex items-start gap-4">
                    <div className="bg-red-100 text-red-600 p-3 rounded-full">
                        <Phone size={16} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Call To Us</h3>
                        <p className="text-sm text-gray-600">We are available 24/7, 7 days a week.</p>
                        <p className="text-sm mt-1">Phone: +8801611112222</p>
                    </div>
                </div>

                <hr />

                {/* Email */}
                <div className="flex items-start gap-4">
                    <div className="bg-red-100 text-red-600 p-3 rounded-full">
                        <Mail size={16} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Write To US</h3>
                        <p className="text-sm text-gray-600">Fill out our form and we will contact you within 24 hours.</p>
                        <p className="text-sm mt-1">Emails: customer@exclusive.com</p>
                        <p className="text-sm">support@exclusive.com</p>
                    </div>
                </div>
            </div>

            {/* Форма справа */}
            <form className="bg-white p-6 rounded shadow space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Your Name *"
                        className="bg-gray-100 px-4 py-2 rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email *"
                        className="bg-gray-100 px-4 py-2 rounded"
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Your Phone *"
                        className="bg-gray-100 px-4 py-2 rounded"
                        required
                    />
                </div>
                <textarea
                    placeholder="Your Message"
                    rows="6"
                    className="w-full bg-gray-100 px-4 py-2 rounded"
                    required
                />
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </section>
    );
}
