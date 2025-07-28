// file: src/pages/public/KoiDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, MessageCircle, Eye, Calendar, Ruler } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const KoiDetailPage = () => {
  const { slug } = useParams();
  const { koiData, siteSettings } = useApp();
  const [koi, setKoi] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundKoi = koiData.find(k => k.slug === slug);
    if (foundKoi) {
      setKoi(foundKoi);
      // Update meta tags
      document.title = `${foundKoi.name} - Asyifa Koi Farm`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', foundKoi.description.substring(0, 160));
      }
    }
    setLoading(false);
  }, [slug, koiData]);

  const handleWhatsAppInquiry = () => {
    if (!koi) return;
    const message = `Halo Asyifa Koi Farm, saya tertarik dengan ikan Koi ${koi.name}. Mohon informasinya.`;
    const whatsappUrl = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: koi.name,
          text: koi.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!koi) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Koi tidak ditemukan</h2>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Kembali ke Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Kembali ke Katalog</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative mb-4 rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={koi.images[selectedImage]}
                alt={koi.name}
                className="w-full h-96 object-cover"
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

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={handleShare}
                  className="bg-white/90 text-gray-700 p-2 rounded-full hover:bg-white transition-colors duration-200"
                >
                  <Share2 size={20} />
                </button>
                <button className="bg-white/90 text-gray-700 p-2 rounded-full hover:bg-white hover:text-red-500 transition-colors duration-200">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto">
              {koi.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-blue-600 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${koi.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {koi.name}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <span className="flex items-center space-x-1">
                  <Eye size={16} />
                  <span className="text-sm">Kode: KOI-{koi.id.toString().padStart(3, '0')}</span>
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{koi.price}</div>
              <p className="text-gray-600">Harga dapat berubah sewaktu-waktu</p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Spesifikasi</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Ruler className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Ukuran</div>
                    <div className="font-medium">{koi.size} cm</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Umur</div>
                    <div className="font-medium">{koi.age}</div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-gray-500">Jenis</div>
                  <div className="font-medium">{koi.type}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-gray-500">Peternak</div>
                  <div className="font-medium">{koi.breeder}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Deskripsi</h3>
              <p className="text-gray-600 leading-relaxed">{koi.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                onClick={handleWhatsAppInquiry}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Tanya via WhatsApp</span>
              </motion.button>
              
              <p className="text-sm text-gray-500 text-center">
                Klik tombol di atas untuk bertanya langsung via WhatsApp
              </p>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Koi Lainnya</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {koiData
              .filter(k => k.id !== koi.id)
              .slice(0, 3)
              .map((relatedKoi) => (
                <Link
                  key={relatedKoi.id}
                  to={`/koi/${relatedKoi.slug}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedKoi.images[0]}
                      alt={relatedKoi.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        relatedKoi.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {relatedKoi.status === 'available' ? 'Tersedia' : 'Sold'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{relatedKoi.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{relatedKoi.type} • {relatedKoi.size} cm</p>
                    <p className="text-lg font-bold text-blue-600">{relatedKoi.price}</p>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KoiDetailPage;