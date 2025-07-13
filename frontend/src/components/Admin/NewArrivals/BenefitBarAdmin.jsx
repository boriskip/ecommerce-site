import { Edit, Trash2 } from 'lucide-react';
import { Truck, Headphones, RotateCcw } from 'lucide-react';

const ICON = {
    Truck: <Truck className="w-6 h-6 mx-auto text-blue-600 mb-2" />,
    Headphones: <Headphones className="w-6 h-6 mx-auto text-blue-600 mb-2" />,
    RotateCcw: <RotateCcw className="w-6 h-6 mx-auto text-blue-600 mb-2" />,
};

export default function BenefitBarAdmin({ benefits = [], onEdit, onDelete }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-md p-4 bg-gray-50 mb-6">
            {benefits.map(benefit => (
                <div key={benefit.id} className="relative bg-white p-4 rounded-lg shadow-sm">
                    {/* Admin Controls */}
                    <div className="absolute top-2 right-2 flex gap-1">
                        <button
                            onClick={() => onEdit?.(benefit)}
                            className="p-1 bg-blue-100 hover:bg-blue-200 rounded text-blue-600"
                            title="Edit"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete?.(benefit.id)}
                            className="p-1 bg-red-100 hover:bg-red-200 rounded text-red-600"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Benefit Content */}
                    <div className="text-center">
                        <div className="flex justify-center mb-2">
                            {ICON[benefit.icon] || <div className="text-gray-400">?</div>}
                        </div>
                        <h3 className="text-sm font-semibold">{benefit.title}</h3>
                        <p className="text-xs text-gray-500">{benefit.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}