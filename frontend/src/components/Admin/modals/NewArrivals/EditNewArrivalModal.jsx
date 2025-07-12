import React, { useState } from "react";
import axiosPrivate from "../../../../api/axiosPrivate";

export default function EditNewArrivalModal({ item, onClose, onUpdated }) {
    const [title, setTitle] = useState(item.title);
    const [subtitle, setSubtitle] = useState(item.subtitle);
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        if (imageFile) {
            formData.append("image", imageFile); // здесь image — файл
        }
        try {
            const response = await axiosPrivate.post(`/api/admin/new-arrivals/${item.id}?_method=PUT`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-HTTP-Method-Override": "PUT",
                },
            });

            if (onUpdated) onUpdated(); // обновим список
            onClose();
        } catch (error) {
            console.error("Ошибка при обновлении New Arrivals:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Редактировать товар</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Название"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Subtitle"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="w-full"
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
