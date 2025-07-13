import { useState, useEffect } from 'react';
import axiosPrivate from '@/api/axiosPrivate';

export default function AdminFooter() {
    const [footerData, setFooterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchFooterData();
    }, []);

    const fetchFooterData = async () => {
        try {
            const response = await axiosPrivate.get('/api/admin/footer');
            setFooterData(response.data);
        } catch (error) {
            console.error('Error fetching footer data:', error);
            setMessage('Ошибка при загрузке данных футера');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            await axiosPrivate.put('/api/admin/footer', footerData);
            setMessage('Настройки футера успешно сохранены!');
        } catch (error) {
            console.error('Error saving footer data:', error);
            setMessage('Ошибка при сохранении настроек футера');
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (section, field, value) => {
        setFooterData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleArrayChange = (section, index, field, value) => {
        setFooterData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addArrayItem = (section, newItem) => {
        setFooterData(prev => ({
            ...prev,
            [section]: [...prev[section], newItem]
        }));
    };

    const removeArrayItem = (section, index) => {
        setFooterData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    if (loading) {
        return <div className="text-center py-8">Загрузка настроек футера...</div>;
    }

    if (!footerData) {
        return <div className="text-center py-8">Данные футера не найдены</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Настройки футера</h2>
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

            {/* Exclusive Section */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Exclusive Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Заголовок</label>
                        <input
                            type="text"
                            value={footerData.exclusive_title}
                            onChange={(e) => handleInputChange('exclusive', 'exclusive_title', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Текст подписки</label>
                        <input
                            type="text"
                            value={footerData.exclusive_subscribe_text}
                            onChange={(e) => handleInputChange('exclusive', 'exclusive_subscribe_text', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Текст предложения</label>
                        <input
                            type="text"
                            value={footerData.exclusive_offer_text}
                            onChange={(e) => handleInputChange('exclusive', 'exclusive_offer_text', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Support Section */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Support Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Заголовок</label>
                        <input
                            type="text"
                            value={footerData.support_title}
                            onChange={(e) => handleInputChange('support', 'support_title', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={footerData.support_email}
                            onChange={(e) => handleInputChange('support', 'support_email', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Телефон</label>
                        <input
                            type="text"
                            value={footerData.support_phone}
                            onChange={(e) => handleInputChange('support', 'support_phone', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">Адрес</label>
                    <textarea
                        value={footerData.support_address}
                        onChange={(e) => handleInputChange('support', 'support_address', e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="3"
                    />
                </div>
            </div>

            {/* Account Links */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Account Links</h3>
                    <button
                        onClick={() => addArrayItem('account_links', { text: '', url: '' })}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Добавить ссылку
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Заголовок секции</label>
                    <input
                        type="text"
                        value={footerData.account_title}
                        onChange={(e) => handleInputChange('account', 'account_title', e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    />
                </div>
                {footerData.account_links.map((link, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Текст ссылки"
                            value={link.text}
                            onChange={(e) => handleArrayChange('account_links', index, 'text', e.target.value)}
                            className="flex-1 p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="URL"
                            value={link.url}
                            onChange={(e) => handleArrayChange('account_links', index, 'url', e.target.value)}
                            className="flex-1 p-2 border rounded"
                        />
                        <button
                            onClick={() => removeArrayItem('account_links', index)}
                            className="bg-red-600 text-white px-3 py-2 rounded"
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>

            {/* Quick Links */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <button
                        onClick={() => addArrayItem('quick_links', { text: '', url: '' })}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Добавить ссылку
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Заголовок секции</label>
                    <input
                        type="text"
                        value={footerData.quick_link_title}
                        onChange={(e) => handleInputChange('quick_link', 'quick_link_title', e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    />
                </div>
                {footerData.quick_links.map((link, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Текст ссылки"
                            value={link.text}
                            onChange={(e) => handleArrayChange('quick_links', index, 'text', e.target.value)}
                            className="flex-1 p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="URL"
                            value={link.url}
                            onChange={(e) => handleArrayChange('quick_links', index, 'url', e.target.value)}
                            className="flex-1 p-2 border rounded"
                        />
                        <button
                            onClick={() => removeArrayItem('quick_links', index)}
                            className="bg-red-600 text-white px-3 py-2 rounded"
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>

            {/* Download App Section */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Download App Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Заголовок</label>
                        <input
                            type="text"
                            value={footerData.download_app_title}
                            onChange={(e) => handleInputChange('download_app', 'download_app_title', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Подзаголовок</label>
                        <input
                            type="text"
                            value={footerData.download_app_subtitle}
                            onChange={(e) => handleInputChange('download_app', 'download_app_subtitle', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">QR Code изображение</label>
                        <input
                            type="text"
                            value={footerData.qr_code_image}
                            onChange={(e) => handleInputChange('download_app', 'qr_code_image', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Google Play изображение</label>
                        <input
                            type="text"
                            value={footerData.google_play_image}
                            onChange={(e) => handleInputChange('download_app', 'google_play_image', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">App Store изображение</label>
                        <input
                            type="text"
                            value={footerData.app_store_image}
                            onChange={(e) => handleInputChange('download_app', 'app_store_image', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Social Media Links</h3>
                    <button
                        onClick={() => addArrayItem('social_links', { platform: '', url: '', icon: '' })}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Добавить соцсеть
                    </button>
                </div>
                {footerData.social_links.map((social, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Платформа"
                            value={social.platform}
                            onChange={(e) => handleArrayChange('social_links', index, 'platform', e.target.value)}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="URL"
                            value={social.url}
                            onChange={(e) => handleArrayChange('social_links', index, 'url', e.target.value)}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Иконка (FaFacebook, FaTwitter, etc.)"
                            value={social.icon}
                            onChange={(e) => handleArrayChange('social_links', index, 'icon', e.target.value)}
                            className="p-2 border rounded"
                        />
                        <button
                            onClick={() => removeArrayItem('social_links', index)}
                            className="bg-red-600 text-white px-3 py-2 rounded"
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>

            {/* Copyright */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Copyright</h3>
                <div>
                    <label className="block text-sm font-medium mb-1">Текст копирайта</label>
                    <input
                        type="text"
                        value={footerData.copyright_text}
                        onChange={(e) => handleInputChange('copyright', 'copyright_text', e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>
        </div>
    );
}
