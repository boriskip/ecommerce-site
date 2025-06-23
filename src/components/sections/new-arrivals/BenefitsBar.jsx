import { Truck, Headphones, RotateCcw } from "lucide-react";

export default function BenefitsBar() {
return (
   <>
      {/* Иконки под сеткой */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
        <div>
          <div className="flex justify-center mb-2">
            <Truck className="w-8 h-8 text-black" />
          </div>
          <h3 className="font-semibold mb-1">FREE AND FAST DELIVERY</h3>
          <p className="text-sm text-gray-500">
            Free delivery for all orders over $140
          </p>
        </div>

        <div>
          <div className="flex justify-center mb-2">
            <Headphones className="w-8 h-8 text-black" />
          </div>
          <h3 className="font-semibold mb-1">24/7 CUSTOMER SERVICE</h3>
          <p className="text-sm text-gray-500">
            Friendly 24/7 customer support
          </p>
        </div>

        <div>
          <div className="flex justify-center mb-2">
            <RotateCcw className="w-8 h-8 text-black" />
          </div>
          <h3 className="font-semibold mb-1">MONEY BACK GUARANTEE</h3>
          <p className="text-sm text-gray-500">
            We return money within 30 days
          </p>
        </div>
      </div>
    </>

);
}
