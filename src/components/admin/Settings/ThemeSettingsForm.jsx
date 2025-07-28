// file: src/components/admin/Settings/ThemeSettingsForm.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Palette, Image, Layout } from 'lucide-react';

const ThemeSettingsForm = ({ onSave, settings }) => {
    const [formData, setFormData] = useState({
        primaryColor: '#3B82F6',
        secondaryColor: '#06B6D4',
        accentColor: '#10B981',
        logoUrl: '',
        faviconUrl: '',
        heroBackgroundUrl: '',
        fontFamily: 'Inter',
        layoutStyle: 'modern'
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFormData({
            primaryColor: '#3B82F6',
            secondaryColor: '#06B6D4',
            accentColor: '#10B981',
            logoUrl: '/logo.png',
            faviconUrl: '/favicon.ico',
            heroBackgroundUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
            fontFamily: 'Inter',
            layoutStyle: 'modern'
        });
    }, [settings]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await onSave(formData);
        setIsLoading(false);
    };

    const colorPresets = [
        { name: 'Biru Ocean', primary: '#3B82F6', secondary: '#06B6D4', accent: '#10B981' },
        { name: 'Hijau Natural', primary: '#10B981', secondary: '#059669', accent: '#F59E0B' },
        { name: 'Ungu Royal', primary: '#8B5CF6', secondary: '#A855F7', accent: '#EC4899' },
        { name: 'Merah Elegant', primary: '#EF4444', secondary: '#F97316', accent: '#84CC16' }
    ];

    const fontOptions = [
        'Inter',
        'Roboto',
        'Open Sans',
        'Lato',
        'Montserrat',
        'Poppins'
    ];

    const applyColorPreset = (preset) => {
        setFormData({
            ...formData,
            primaryColor: preset.primary,
            secondaryColor: preset.secondary,
            accentColor: preset.accent
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-2 mb-2">
                    <Palette className="w-5 h-5 text-purple-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Tema & Tampilan</h2>
                </div>
                <p className="text-gray-600 text-sm">
                    Kustomisasi warna, font, dan elemen visual website Anda.
                </p>
            </div>

            {/* Color Settings */}
            <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900">Skema Warna</h3>

                {/* Color Presets */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Preset Warna
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {colorPresets.map((preset, index) => (
                            <motion.button
                                key={index}
                                type="button"
                                onClick={() => applyColorPreset(preset)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200"
                            >
                                <div className="flex space-x-1">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: preset.primary }}
                                    ></div>
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: preset.secondary }}
                                    ></div>
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: preset.accent }}
                                    ></div>
                                </div>
                                <span className="text-sm font-medium">{preset.name}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Custom Colors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Warna Primer
                        </label>
                        <div className="flex space-x-2">
                            <input
                                type="color"
                                name="primaryColor"
                                value={formData.primaryColor}
                                onChange={handleChange}
                                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={formData.primaryColor}
                                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Warna Sekunder
                        </label>
                        <div className="flex space-x-2">
                            <input
                                type="color"
                                name="secondaryColor"
                                value={formData.secondaryColor}
                                onChange={handleChange}
                                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={formData.secondaryColor}
                                onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Warna Aksen
                        </label>
                        <div className="flex space-x-2">
                            <input
                                type="color"
                                name="accentColor"
                                value={formData.accentColor}
                                onChange={handleChange}
                                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={formData.accentColor}
                                onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Typography */}
            <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900">Typography</h3>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Family
                    </label>
                    <select
                        name="fontFamily"
                        value={formData.fontFamily}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                        {fontOptions.map(font => (
                            <option key={font} value={font}>{font}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900 flex items-center">
                    <Image className="w-4 h-4 mr-2 text-gray-500" />
                    Gambar & Logo
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL Logo
                        </label>
                        <input
                            type="url"
                            name="logoUrl"
                            value={formData.logoUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="https://example.com/logo.png"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL Favicon
                        </label>
                        <input
                            type="url"
                            name="faviconUrl"
                            value={formData.faviconUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="https://example.com/favicon.ico"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background Hero Section
                    </label>
                    <input
                        type="url"
                        name="heroBackgroundUrl"
                        value={formData.heroBackgroundUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="https://images.unsplash.com/photo-..."
                    />
                </div>
            </div>

            {/* Layout Style */}
            <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900 flex items-center">
                    <Layout className="w-4 h-4 mr-2 text-gray-500" />
                    Style Layout
                </h3>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gaya Layout
                    </label>
                    <select
                        name="layoutStyle"
                        value={formData.layoutStyle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                        <option value="modern">Modern</option>
                        <option value="classic">Classic</option>
                        <option value="minimal">Minimal</option>
                        <option value="elegant">Elegant</option>
                    </select>
                </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Preview Warna:</h4>
                <div className="flex space-x-4">
                    <div className="text-center">
                        <div
                            className="w-16 h-16 rounded-lg mb-2"
                            style={{ backgroundColor: formData.primaryColor }}
                        ></div>
                        <span className="text-xs text-gray-600">Primer</span>
                    </div>
                    <div className="text-center">
                        <div
                            className="w-16 h-16 rounded-lg mb-2"
                            style={{ backgroundColor: formData.secondaryColor }}
                        ></div>
                        <span className="text-xs text-gray-600">Sekunder</span>
                    </div>
                    <div className="text-center">
                        <div
                            className="w-16 h-16 rounded-lg mb-2"
                            style={{ backgroundColor: formData.accentColor }}
                        ></div>
                        <span className="text-xs text-gray-600">Aksen</span>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="border-t border-gray-200 pt-6">
                <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700'
                        }`}
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Menyimpan...</span>
                        </>
                    ) : (
                        <>
                            <Save size={16} />
                            <span>Simpan Tema</span>
                        </>
                    )}
                </motion.button>
            </div>
        </form>
    );
};

export default ThemeSettingsForm;