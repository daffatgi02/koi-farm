// file: src/components/admin/Settings/SiteSettingsForm.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, Type } from 'lucide-react';

const SiteSettingsForm = ({ onSave, settings }) => {
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({
      heroTitle: settings.heroTitle || '',
      heroSubtitle: settings.heroSubtitle || '',
      siteName: 'Asyifa Koi Farm',
      siteDescription: 'Premium Koi Fish Collection',
      contactEmail: 'info@asyifakoifarm.com',
      contactPhone: '+62 812-3456-7890'
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
          <Globe className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Pengaturan Situs</h2>
        </div>
        <p className="text-gray-600 text-sm">
          Konfigurasi informasi dasar website seperti judul, deskripsi, dan kontak.
        </p>
      </div>

      {/* Hero Section Settings */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-900 flex items-center">
          <Type className="w-4 h-4 mr-2 text-gray-500" />
          Hero Section
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Judul Utama Hero *
          </label>
          <input
            type="text"
            name="heroTitle"
            value={formData.heroTitle}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Asyifa Koi Farm: The Art of Living Jewels"
          />
          <p className="text-xs text-gray-500 mt-1">
            Judul besar yang ditampilkan di bagian atas halaman
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sub-judul Hero *
          </label>
          <textarea
            name="heroSubtitle"
            value={formData.heroSubtitle}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
            placeholder="Discover premium quality koi fish from our trusted farm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Deskripsi yang ditampilkan di bawah judul utama
          </p>
        </div>
      </div>

      {/* General Settings */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-900">Informasi Umum</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Situs
            </label>
            <input
              type="text"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Kontak
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi Situs
          </label>
          <textarea
            name="siteDescription"
            value={formData.siteDescription}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nomor Telepon
          </label>
          <input
            type="text"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="border-t border-gray-200 pt-6">
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
            isLoading
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
              <span>Simpan Pengaturan</span>
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
};

export default SiteSettingsForm;