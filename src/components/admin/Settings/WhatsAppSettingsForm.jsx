// file: src/components/admin/Settings/WhatsAppSettingsForm.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, MessageSquare, Phone, MessageCircle, ExternalLink } from 'lucide-react';

const WhatsAppSettingsForm = ({ onSave, settings }) => {
  const [formData, setFormData] = useState({
    whatsappNumber: '',
    defaultMessage: '',
    inquiryMessage: '',
    businessHours: '',
    autoReplyMessage: '',
    isBusinessAccount: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({
      whatsappNumber: settings.whatsappNumber || '',
      defaultMessage: 'Halo Asyifa Koi Farm, saya ingin bertanya tentang koleksi koi Anda.',
      inquiryMessage: 'Halo Asyifa Koi Farm, saya tertarik dengan ikan Koi {koiName}. Mohon informasinya.',
      businessHours: 'Senin - Sabtu: 08:00 - 17:00',
      autoReplyMessage: 'Terima kasih telah menghubungi Asyifa Koi Farm. Kami akan segera merespon pesan Anda.',
      isBusinessAccount: true
    });
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onSave(formData);
    setIsLoading(false);
  };

  const formatWhatsAppNumber = (number) => {
    // Remove all non-digits
    const cleaned = number.replace(/\D/g, '');
    
    // Format as Indonesian number
    if (cleaned.startsWith('0')) {
      return '62' + cleaned.substring(1);
    } else if (cleaned.startsWith('62')) {
      return cleaned;
    } else {
      return '62' + cleaned;
    }
  };

  const testWhatsAppLink = () => {
    const formattedNumber = formatWhatsAppNumber(formData.whatsappNumber);
    const testMessage = encodeURIComponent(formData.defaultMessage);
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${testMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-2 mb-2">
          <MessageSquare className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">Pengaturan WhatsApp</h2>
        </div>
        <p className="text-gray-600 text-sm">
          Konfigurasi nomor WhatsApp dan pesan otomatis untuk inquiry pelanggan.
        </p>
      </div>

      {/* WhatsApp Number */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-900 flex items-center">
          <Phone className="w-4 h-4 mr-2 text-gray-500" />
          Nomor WhatsApp
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nomor WhatsApp Business *
          </label>
          <div className="flex space-x-3">
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="628123456789 atau 08123456789"
            />
            <motion.button
              type="button"
              onClick={testWhatsAppLink}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <ExternalLink size={16} />
              <span>Test</span>
            </motion.button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Format: 62812345678 (kode negara + nomor tanpa 0 di depan)
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="isBusinessAccount"
            checked={formData.isBusinessAccount}
            onChange={handleChange}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label className="text-sm text-gray-700">
            Gunakan WhatsApp Business Account
          </label>
        </div>
      </div>

      {/* Message Templates */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-900 flex items-center">
          <MessageCircle className="w-4 h-4 mr-2 text-gray-500" />
          Template Pesan
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pesan Default (Kontak Umum)
          </label>
          <textarea
            name="defaultMessage"
            value={formData.defaultMessage}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Pesan yang akan muncul saat pengunjung klik tombol "Chat Sekarang"
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pesan Inquiry Koi
          </label>
          <textarea
            name="inquiryMessage"
            value={formData.inquiryMessage}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Template pesan saat inquiry koi tertentu. Gunakan {'{koiName}'} untuk nama koi.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pesan Auto Reply
          </label>
          <textarea
            name="autoReplyMessage"
            value={formData.autoReplyMessage}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Pesan otomatis yang dapat Anda gunakan untuk membalas inquiry
          </p>
        </div>
      </div>

      {/* Business Hours */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-900">Jam Operasional</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jam Operasional
          </label>
          <input
            type="text"
            name="businessHours"
            value={formData.businessHours}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">
            Informasi jam operasional yang ditampilkan di website
          </p>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-green-900 mb-3">Preview WhatsApp Link:</h4>
        <div className="bg-white rounded p-3 border text-sm">
          <strong>Nomor:</strong> {formatWhatsAppNumber(formData.whatsappNumber || '628123456789')}<br />
          <strong>Pesan:</strong> {formData.defaultMessage}
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
              : 'bg-green-600 hover:bg-green-700'
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
              <span>Simpan Pengaturan WhatsApp</span>
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
};

export default WhatsAppSettingsForm;