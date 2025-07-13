import { useState, useEffect } from 'react';
import axiosPrivate from '@/api/axiosPrivate';
import { Heart, ShoppingCart, User, Menu, X } from 'lucide-react';

export default function AdminHeader() {
    const [headerData, setHeaderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchHeaderData();
    }, []);

    const fetchHeaderData = async () => {
        try {
            const response = await axiosPrivate.get('/api/admin/header');
            setHeaderData(response.data);
        } catch (error) {
            console.error('Error fetching header data:', error);
            setMessage('Ошибка при загрузке данных хедера');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            await axiosPrivate.put('/api/admin/header', headerData);
            setMessage('Настройки хедера успешно сохранены!');
        } catch (error) {
            console.error('Error saving header data:', error);
            setMessage('Ошибка при сохранении настроек хедера');
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (field, value) => {
        setHeaderData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleArrayChange = (arrayName, index, field, value) => {
        setHeaderData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addArrayItem = (arrayName, newItem) => {
        setHeaderData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], newItem]
        }));
    };

    const removeArrayItem = (arrayName, index) => {
        setHeaderData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index)
        }));
    };

    const getIconComponent = (iconName) => {
        const icons = {
            'Heart': Heart,
            'ShoppingCart': ShoppingCart,
            'User': User,
            'Menu': Menu,
            'X': X,
        };
        return icons[iconName] || Heart;
    };

    if (loading) {
        return <div className="text-center py-8">Загрузка настроек хедера...</div>;
    }

    if (!headerData) {
        return <div className="text-center py-8">Данные хедера не найдены</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Настройки хедера</h2>
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

            {/* Logo Section */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Logo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Путь к логотипу</label>
                        <input
                            type="text"
                            value={headerData.logo_image}
                            onChange={(e) => handleInputChange('logo_image', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Alt текст</label>
                        <input
                            type="text"
                            value={headerData.logo_alt}
                            onChange={(e) => handleInputChange('logo_alt', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Поиск</h3>
                <div>
                    <label className="block text-sm font-medium mb-1">Placeholder для поиска</label>
                    <input
                        type="text"
                        value={headerData.search_placeholder}
                        onChange={(e) => handleInputChange('search_placeholder', e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            {/* Navigation Links */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Навигационные ссылки</h3>
                    <button
                        onClick={() => addArrayItem('navigation_links', { text: '', url: '', enabled: true })}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Добавить ссылку
                    </button>
                </div>
                {headerData.navigation_links.map((link, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Текст ссылки"
                            value={link.text}
                            onChange={(e) => handleArrayChange('navigation_links', index, 'text', e.target.value)}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="URL"
                            value={link.url}
                            onChange={(e) => handleArrayChange('navigation_links', index, 'url', e.target.value)}
                            className="p-2 border rounded"
                        />
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={link.enabled}
                                onChange={(e) => handleArrayChange('navigation_links', index, 'enabled', e.target.checked)}
                                className="mr-2"
                            />
                            <label className="text-sm">Активна</label>
                        </div>
                        <button
                            onClick={() => removeArrayItem('navigation_links', index)}
                            className="bg-red-600 text-white px-3 py-2 rounded"
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>

            {/* Header Icons */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Иконки хедера</h3>
                    <button
                        onClick={() => addArrayItem('header_icons', {
                            type: '',
                            icon: 'Heart',
                            url: '',
                            enabled: true,
                            show_badge: true,
                            badge_count: 0
                        })}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Добавить иконку
                    </button>
                </div>
                {headerData.header_icons.map((icon, index) => {
                    const IconComponent = getIconComponent(icon.icon);
                    return (
                        <div key={index} className="border p-4 rounded mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Тип (wishlist, cart, user)"
                                    value={icon.type}
                                    onChange={(e) => handleArrayChange('header_icons', index, 'type', e.target.value)}
                                    className="p-2 border rounded"
                                />
                                <select
                                    value={icon.icon}
                                    onChange={(e) => handleArrayChange('header_icons', index, 'icon', e.target.value)}
                                    className="p-2 border rounded"
                                >
                                    <option value="Heart">Heart</option>
                                    <option value="ShoppingCart">ShoppingCart</option>
                                    <option value="User">User</option>
                                    <option value="Menu">Menu</option>
                                    <option value="X">X</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="URL"
                                    value={icon.url}
                                    onChange={(e) => handleArrayChange('header_icons', index, 'url', e.target.value)}
                                    className="p-2 border rounded"
                                />
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={icon.enabled}
                                        onChange={(e) => handleArrayChange('header_icons', index, 'enabled', e.target.checked)}
                                        className="mr-2"
                                    />
                                    <label className="text-sm">Активна</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={icon.show_badge}
                                        onChange={(e) => handleArrayChange('header_icons', index, 'show_badge', e.target.checked)}
                                        className="mr-2"
                                    />
                                    <label className="text-sm">Бейдж</label>
                                </div>
                                <button
                                    onClick={() => removeArrayItem('header_icons', index)}
                                    className="bg-red-600 text-white px-3 py-2 rounded"
                                >
                                    Удалить
                                </button>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm">Предпросмотр:</span>
                                <div className="flex items-center gap-2">
                                    <IconComponent className="w-5 h-5" />
                                    {icon.show_badge && (
                                        <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                            {icon.badge_count}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type="number"
                                    placeholder="Количество"
                                    value={icon.badge_count}
                                    onChange={(e) => handleArrayChange('header_icons', index, 'badge_count', parseInt(e.target.value) || 0)}
                                    className="w-20 p-1 border rounded text-sm"
                                    min="0"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Mobile Menu */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Мобильное меню</h3>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={headerData.mobile_menu_enabled}
                        onChange={(e) => handleInputChange('mobile_menu_enabled', e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-sm">Включить мобильное меню</label>
                </div>
            </div>

            {/* Styling */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Стилизация</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Цвет фона</label>
                        <input
                            type="text"
                            value={headerData.background_color}
                            onChange={(e) => handleInputChange('background_color', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="bg-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Цвет текста</label>
                        <input
                            type="text"
                            value={headerData.text_color}
                            onChange={(e) => handleInputChange('text_color', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="text-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Цвет при наведении</label>
                        <input
                            type="text"
                            value={headerData.hover_color}
                            onChange={(e) => handleInputChange('hover_color', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="hover:text-red-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 