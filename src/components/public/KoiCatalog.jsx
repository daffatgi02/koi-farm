// file: src/components/public/KoiCatalog.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Eye, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const KoiCatalog = () => {
  const { filteredKoiData, loading, filterStatus, setFilterStatus, siteSettings } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filterOptions = [
    { value: 'all', label: 'Semua Koi', count: filteredKoiData.length },
    { value: 'available', label: 'Tersedia', count: filteredKoiData.filter(koi => koi.status === 'available').length },
    { value: 'sold', label: 'Sold Out', count: filteredKoiData.filter(koi => koi.status === 'sold').length }
  ];

  const searchedKoi = filteredKoiData.filter(koi =>
    koi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    koi.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWhatsAppInquiry = (koi) => {
    const message = `Halo Asyifa Koi Farm, saya tertarik dengan ikan Koi ${koi.name}. Mohon informasinya.`;
    const whatsappUrl = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="catalog" className="py-20 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Koleksi Koi Premium
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan ikan koi berkualitas tinggi dengan berbagai jenis dan ukuran
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between"
        >
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari koi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-500" size={20} />
            {filterOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setFilterStatus(option.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filterStatus === option.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {option.label} ({option.count})
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Memuat koleksi koi...</p>
          </div>
        )}

        {/* Koi Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchedKoi.map((koi, index) => (
              <motion.div
                key={koi.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={koi.images[0]}
                    alt={koi.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      koi.status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {koi.status === 'available' ? 'Tersedia' : 'Sold Out'}
                    </span>
                  </div>

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex space-x-3">
                      <Link
                        to={`/koi/${koi.slug}`}
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Eye size={20} />
                      </Link>
                      <button
                        onClick={() => handleWhatsAppInquiry(koi)}
                        className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors duration-200"
                      >
                        <MessageCircle size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{koi.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{koi.type}</span>
                    <span className="text-sm text-gray-500">{koi.size} cm</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-4">{koi.price}</p>
                  
                  <div className="flex space-x-3">
                    <Link
                      to={`/koi/${koi.slug}`}
                      className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors duration-200"
                    >
                      Lihat Detail
                    </Link>
                    <button
                      onClick={() => handleWhatsAppInquiry(koi)}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                    >
                      Tanya via WA
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* No Results */}
        {searchedKoi.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">Tidak ada koi yang ditemukan.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default KoiCatalog;