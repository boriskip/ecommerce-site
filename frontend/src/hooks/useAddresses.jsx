import { useEffect, useState } from 'react';
import axiosPrivate from '../api/axiosPrivate';
import toast from 'react-hot-toast';

export default function useAddresses() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAddresses = async () => {
        try {
            const res = await axiosPrivate.get('/api/addresses');
            setAddresses(res.data);
        } catch (err) {
            toast.error("Failed to load addresses");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addAddress = async (address) => {
        try {
            const res = await axiosPrivate.post('/api/addresses', address);
            setAddresses(prev => [...prev, res.data]);
            toast.success("Address added");
        } catch (err) {
            toast.error("Failed to add address");
            console.error(err);
        }
    };

    const deleteAddress = async (id) => {
        try {
            await axiosPrivate.delete(`/api/addresses/${id}`);
            setAddresses(prev => prev.filter(a => a.id !== id));
            toast.success("Address deleted");
        } catch (err) {
            toast.error("Failed to delete address");
            console.error(err);
        }
    };

    const updateAddress = async (id, updated) => {
        try {
            const res = await axiosPrivate.put(`/api/addresses/${id}`, updated);
            setAddresses(prev => prev.map(a => a.id === id ? res.data : a));
            toast.success("Address updated");
        } catch (err) {
            toast.error("Failed to update address");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    return {
        addresses,
        loading,
        fetchAddresses,
        addAddress,
        deleteAddress,
        updateAddress,
    };
}
