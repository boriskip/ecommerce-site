import { useEffect, useState } from 'react';
import BenefitsBar from './BenefitsBar';
import axiosPublic from '../../../api/axiosPublick';

export default function NewArrivalSection() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axiosPublic.get('/api/new-arrivals');
        setNewArrivals(response.data);
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
        // Fallback к статическим данным если API недоступен
        setNewArrivals([
          {
            id: 1,
            title: "PlayStation 5",
            subtitle: "Black and White version of the PS5 coming out on sale.",
            image_url: "/new-arrival/ps5.png",
          },
          {
            id: 2,
            title: "Women's Collections",
            subtitle: "Featured women collections that give you another vibe.",
            image_url: "/new-arrival/attractive-woman-wearing-hat-posing-black-background 1.png",
          },
          {
            id: 3,
            title: "Speakers",
            subtitle: "Amazon wireless speakers.",
            image_url: "/new-arrival/amazon.png",
          },
          {
            id: 4,
            title: "Perfume",
            subtitle: "GUCCI INTENSE OUD EDP.",
            image_url: "/new-arrival/gucci.png",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-sm text-red-500 font-medium mb-1">Featured</p>
          <h2 className="text-2xl font-bold">New Arrival</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`relative rounded overflow-hidden animate-pulse bg-gray-300
                ${i === 1 ? "md:col-span-2 md:row-span-2" : ""} 
                ${i === 2 ? "md:col-start-3 md:col-span-2 md:row-start-1" : ""}
              `}
            >
              <div className="w-full h-full min-h-[200px]"></div>
            </div>
          ))}
        </div>
        <BenefitsBar />
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Heading */}
      <div className="mb-8">
        <p className="text-sm text-red-500 font-medium mb-1">Featured</p>
        <h2 className="text-2xl font-bold">New Arrival</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
        {newArrivals.map((item, index) => (
          <div
            key={item.id}
            className={`relative rounded overflow-hidden group 
              ${index === 0 ? "md:col-span-2 md:row-span-2" : ""} 
              ${index === 1 ? "md:col-start-3 md:col-span-2 md:row-start-1" : ""}
            `}
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end text-white">
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-sm mb-2">{item.subtitle}</p>
              <button className="bg-white text-black text-xs px-3 py-1 rounded w-fit hover:bg-gray-200">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <BenefitsBar />
    </section>
  );
}