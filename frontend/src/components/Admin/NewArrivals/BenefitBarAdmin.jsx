import { useEffect, useState } from "react";
import axiosPrivate from "../../../api/axiosPrivate";
import { Truck, Headphones, RotateCcw } from 'lucide-react';

const ICON = {
    Truck: <Truck className="w-6 h-6 mx-auto text-blue-600 mb-2" />,
    Headphones: <Headphones className="w-6 h-6 mx-auto text-blue-600 mb-2" />,
    RotateCcw: <RotateCcw className="w-6 h-6 mx-auto text-blue-600 mb-2" />,
};

export default function BenefitBarAdmin() {
    const [benefits, setBenefits] = useState([]);

    useEffect(() => {
        axiosPrivate.get('/api/admin/benefits').then(res => setBenefits(res.data))
            .catch(err => console.error('Error lauded benefits:', err));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-md p4 bg-gray-50 mb-6">
            {benefits.map(benefit => (
                <div key={benefit.id} className="text-content">
                    <div className="flex justify-center mb-2">
                        {ICON[benefit.icon] || <div className="text-gray-400">?</div>}
                    </div>
                    <h3 className="text-sm font-semibold">{benefit.title}</h3>
                    <p className="text-xs text-gray-500"> {benefit.subtitle} </p>
                </div>
            ))}
        </div>
    );
}