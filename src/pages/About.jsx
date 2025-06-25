import React from "react";

export default function About() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-20">
      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <div className="text-gray-700 space-y-4">
            <p>Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace...</p>
            <p>Exclusive has more than 1 Million products to offer...</p>
          </div>
        </div>
        <img
          src="public/about/story-img.png"
          alt="Our story"
          className="w-full h-auto rounded"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { number: "10.5k", label: "Sellers active our site" },
          { number: "33k", label: "Monthly Product Sale", highlight: true },
          { number: "45.5k", label: "Customer active in our site" },
          { number: "25k", label: "Annual gross sale in our site" },
        ].map(({ number, label, highlight }, i) => (
          <div
            key={i}
            className={`text-center border p-6 rounded ${
              highlight ? "bg-red-500 text-white" : ""
            }`}
          >
            <div className="text-2xl font-bold">{number}</div>
            <div className="text-sm">{label}</div>
          </div>
        ))}
      </div>

      {/* Team */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-center">Our Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            {
              name: "Tom Cruise",
              role: "Founder & Chairman",
              img: "public/about/tom.png",
            },
            {
              name: "Emma Watson",
              role: "Managing Director",
              img: "public/about/emma.png",
            },
            {
              name: "Will Smith",
              role: "Product Designer",
              img: "public/about/will.png",
            },
          ].map((member, i) => (
            <div key={i} className="space-y-3">
              <img src={member.img} alt={member.name} className="mx-auto" />
              <h4 className="font-semibold">{member.name}</h4>
              <p className="text-sm text-gray-500">{member.role}</p>
              <div className="flex justify-center gap-4 text-gray-500 text-sm">
                <a href="#"><i className="fab fa-twitter" /></a>
                <a href="#"><i className="fab fa-instagram" /></a>
                <a href="#"><i className="fab fa-linkedin" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {[
          {
            icon: "🚚",
            title: "FREE AND FAST DELIVERY",
            desc: "Free delivery for all orders over $140",
          },
          {
            icon: "📞",
            title: "24/7 CUSTOMER SERVICE",
            desc: "Friendly 24/7 customer support",
          },
          {
            icon: "💸",
            title: "MONEY BACK GUARANTEE",
            desc: "We return money within 30 days",
          },
        ].map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="text-3xl">{item.icon}</div>
            <h5 className="font-semibold">{item.title}</h5>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}