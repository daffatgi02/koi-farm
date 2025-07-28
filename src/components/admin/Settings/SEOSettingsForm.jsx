// file: src/components/admin/Settings/SEOSettingsForm.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Search, FileText, Tag } from 'lucide-react';

const SEOSettingsForm = ({ onSave, settings }) => {
    const [formData, setFormData] = useState({
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        ogTitle: '',
        ogDescription: '',
        twitterTitle: '',
        twitterDescription: '',
        robotsTxt: '',
        sitemapUrl: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFormData({
            metaTitle: settings.metaTitle || '',
            metaDescription: settings.metaDescription || '',
            metaKeywords: 'ikan koi, koi premium, jual koi, koi berkualitas, asyifa koi farm',
            ogTitle: settings.metaTitle || '',
            ogDescription: settings.metaDescription || '',
            twitterTitle: settings.metaTitle || '',
            twitterDescription: settings.metaDescription || '',
            robotsTxt: 'User-agent: *\nAllow: /',
            sitemapUrl: '/sitemap.xml'
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

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-2 mb-2">
                    <Search className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">SEO & Meta Tags</h2>
                </div>
                <p className="text-gray-600 text-sm">
                    Optimasi mesin pencari untuk meningkatkan visibilitas website di search engine.
                </p>
            </div>

            {/* Meta Tags */}
            <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900 flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-gray-500" />
                    Meta Tags Utama
                </h3>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Title *
                    </label>
                    <input
                        type="text"
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleChange}
                        maxLength={60}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Asyifa Koi Farm - Premium Koi Fish Collection"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Judul yang ditampilkan di hasil pencarian Google</span>
                        <span>{formData.metaTitle.length}/60</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description *
                    </label>
                    <textarea
                        name="metaDescription"
                        value={formData.metaDescription}
                        onChange={handleChange}
                        maxLength={160}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                        placeholder="Explore our exclusive collection of high-quality koi fish..."
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Deskripsi yang ditampilkan di hasil pencarian</span>
                        <span>{formData.metaDescription.length}/160</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Keywords
                    </label>
                    <input
                        type="text"
                        name="metaKeywords"
                        value={formData.metaKeywords}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="ikan koi, koi premium, jual koi, koi berkualitas"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Kata kunci dipisahkan dengan koma
                    </p>
                </div>
            </div>

            {/* Open Graph Tags */}
            <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    Open Graph (Facebook)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            OG Title
                        </label>
                        <input
                            type="text"
                            name="ogTitle"
                            value={formData.ogTitle}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Twitter Title
                        </label>
                        <input
                            type="text"
                            name="twitterTitle"
                            value={formData.twitterTitle}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Description
                    </label>
                    <textarea
                        name="ogDescription"
                        value={formData.ogDescription}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twitter Description
                    </label>
                    <textarea
                        name="twitterDescription"
                        value={formData.twitterDescription}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                    />
                </div>
            </div>

            {/* Technical SEO */}
            <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900">Technical SEO</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Robots.txt Content
                        </label>
                        <textarea
                            name="robotsTxt"
                            value={formData.robotsTxt}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none font-mono text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sitemap URL
                        </label>
                        <input
                            type="text"
                            name="sitemapUrl"
                            value={formData.sitemapUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        />

                        {/* SEO Tips */}
                        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-blue-900 mb-2">Tips SEO:</h4>
                            <ul className="text-xs text-blue-800 space-y-1">
                                <li>• Gunakan kata kunci yang relevan di title dan description</li>
                                <li>• Title maksimal 60 karakter, description maksimal 160 karakter</li>
                                <li>• Pastikan setiap halaman memiliki meta description unik</li>
                                <li>• Update sitemap secara berkala</li>
                            </ul>
                        </div>
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
                        : 'bg-blue-600 hover:bg-blue-700'
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
                            <span>Simpan SEO Settings</span>
                        </>
                    )}
                </motion.button>
            </div>
        </form>
    );
};

export default SEOSettingsForm;