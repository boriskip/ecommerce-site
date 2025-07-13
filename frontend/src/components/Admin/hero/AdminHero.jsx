import { useState, useEffect } from 'react';
import axiosPrivate from '@/api/axiosPrivate';

export default function AdminHero() {
    const [heroData, setHeroData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchHeroData();
    }, []);

    const fetchHeroData = async () => {
        try {
            const response = await axiosPrivate.get('/api/admin/hero');
            setHeroData(response.data);
        } catch (error) {
            console.error('Error fetching hero data:', error);
            setMessage('Ошибка при загрузке данных hero секции');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            await axiosPrivate.put('/api/admin/hero', heroData);
            setMessage('Настройки hero секции успешно сохранены!');
        } catch (error) {
            console.error('Error saving hero data:', error);
            setMessage('Ошибка при сохранении настроек hero секции');
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (field, value) => {
        setHeroData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleArrayChange = (arrayName, index, field, value) => {
        setHeroData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addArrayItem = (arrayName, newItem) => {
        setHeroData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], newItem]
        }));
    };

    const removeArrayItem = (arrayName, index) => {
        setHeroData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index)
        }));
    };

    if (loading) {
        return <div className="text-center py-8">Загрузка настроек hero секции...</div>;
    }

    if (!heroData) {
        return <div className="text-center py-8">Данные hero секции не найдены</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Настройки Hero секции</h2>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {saving ? 'Сохранение...' : 'Сохранить'}
                </button>
            </div>

            {message && (
                <div className={`p-3 rounded ${message.includes('Ошибка') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}

            {/* Categories Section */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Категории</h3>
                    <button
                        onClick={() => addArrayItem('categories', { name: '', enabled: true, has_arrow: false })}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Добавить категорию
                    </button>
                </div>
                {heroData.categories.map((category, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Название категории"
                            value={category.name}
                            onChange={(e) => handleArrayChange('categories', index, 'name', e.target.value)}
                            className="p-2 border rounded"
                        />
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={category.enabled}
                                onChange={(e) => handleArrayChange('categories', index, 'enabled', e.target.checked)}
                                className="mr-2"
                            />
                            <label className="text-sm">Активна</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={category.has_arrow}
                                onChange={(e) => handleArrayChange('categories', index, 'has_arrow', e.target.checked)}
                                className="mr-2"
                            />
                            <label className="text-sm">Показать стрелку</label>
                        </div>
                        <button
                            onClick={() => removeArrayItem('categories', index)}
                            className="bg-red-600 text-white px-3 py-2 rounded"
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>

            {/* Banners Section */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Баннеры</h3>
                    <button
                        onClick={() => addArrayItem('banners', {
                            title: '',
                            subtitle: '',
                            image: '',
                            enabled: true,
                            order: heroData.banners.length + 1
                        })}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Добавить баннер
                    </button>
                </div>
                {heroData.banners.map((banner, index) => (
                    <div key={index} className="border p-4 rounded mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Заголовок"
                                value={banner.title}
                                onChange={(e) => handleArrayChange('banners', index, 'title', e.target.value)}
                                className="p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Подзаголовок"
                                value={banner.subtitle}
                                onChange={(e) => handleArrayChange('banners', index, 'subtitle', e.target.value)}
                                className="p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Путь к изображению"
                                value={banner.image}
                                onChange={(e) => handleArrayChange('banners', index, 'image', e.target.value)}
                                className="p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Порядок"
                                value={banner.order}
                                onChange={(e) => handleArrayChange('banners', index, 'order', parseInt(e.target.value) || 1)}
                                className="p-2 border rounded"
                                min="1"
                            />
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={banner.enabled}
                                    onChange={(e) => handleArrayChange('banners', index, 'enabled', e.target.checked)}
                                    className="mr-2"
                                />
                                <label className="text-sm">Активен</label>
                            </div>
                            <button
                                onClick={() => removeArrayItem('banners', index)}
                                className="bg-red-600 text-white px-3 py-2 rounded"
                            >
                                Удалить
                            </button>
                        </div>
                        {banner.image && (
                            <div className="mt-2">
                                <span className="text-sm text-gray-600">Предпросмотр:</span>
                                <img
                                    src={banner.image}
                                    alt={banner.title}
                                    className="w-32 h-20 object-cover rounded mt-1"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Mobile Menu Settings */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Мобильное меню</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={heroData.mobile_menu_enabled}
                            onChange={(e) => handleInputChange('mobile_menu_enabled', e.target.checked)}
                            className="mr-2"
                        />
                        <label className="text-sm">Включить мобильное меню</label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Текст показа</label>
                        <input
                            type="text"
                            value={heroData.mobile_menu_text}
                            onChange={(e) => handleInputChange('mobile_menu_text', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Текст скрытия</label>
                        <input
                            type="text"
                            value={heroData.mobile_menu_hide_text}
                            onChange={(e) => handleInputChange('mobile_menu_hide_text', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Styling */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Стилизация</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Цвет фона</label>
                        <input
                            type="text"
                            value={heroData.background_color}
                            onChange={(e) => handleInputChange('background_color', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="bg-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Цвет текста</label>
                        <input
                            type="text"
                            value={heroData.text_color}
                            onChange={(e) => handleInputChange('text_color', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Акцентный цвет</label>
                        <input
                            type="text"
                            value={heroData.accent_color}
                            onChange={(e) => handleInputChange('accent_color', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="text-indigo-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Цвет при наведении</label>
                        <input
                            type="text"
                            value={heroData.hover_color}
                            onChange={(e) => handleInputChange('hover_color', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="hover:text-indigo-800"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 