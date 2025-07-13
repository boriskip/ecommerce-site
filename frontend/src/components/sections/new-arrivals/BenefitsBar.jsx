import { useEffect, useState } from "react";
import { Truck, Headphones, RotateCcw } from "lucide-react";
import axiosPublic from "../../../api/axiosPublick";

// Объект для маппинга иконок
const iconMap = {
  'Truck': Truck,
  'Headphones': Headphones,
  'RotateCcw': RotateCcw,
};

export default function BenefitsBar() {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await axiosPublic.get('/api/benefits');
        setBenefits(response.data);
      } catch (error) {
        console.error('Error fetching benefits:', error);
        // Fallback к статическим данным если API недоступен
        setBenefits([
          {
            id: 1,
            icon: 'Truck',
            title: 'FREE AND FAST DELIVERY',
            subtitle: 'Free delivery for all orders over $140'
          },
          {
            id: 2,
            icon: 'Headphones',
            title: '24/7 CUSTOMER SERVICE',
            subtitle: 'Friendly 24/7 customer support'
          },
          {
            id: 3,
            icon: 'RotateCcw',
            title: 'MONEY BACK GUARANTEE',
            subtitle: 'We return money within 30 days'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse">
            <div className="w-8 h-8 bg-gray-300 rounded mx-auto mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-1"></div>
            <div className="h-3 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Иконки под сеткой */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
        {benefits.map((benefit) => {
          const IconComponent = iconMap[benefit.icon] || Truck;

          return (
            <div key={benefit.id}>
              <div className="flex justify-center mb-2">
                <IconComponent className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-semibold mb-1">{benefit.title}</h3>
              <p className="text-sm text-gray-500">
                {benefit.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
