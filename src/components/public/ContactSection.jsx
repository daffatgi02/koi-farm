// file: src/components/public/ContactSection.jsx
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ContactSection = () => {
  const { siteSettings } = useApp();

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat',
      info: 'Jl. Koi Raya No. 123, Bogor, Jawa Barat 16610'
    },
    {
      icon: Phone,
      title: 'Telepon',
      info: '+62 812-3456-7890'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'info@asyifakoifarm.com'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      info: 'Senin - Sabtu: 08:00 - 17:00'
    }
  ];

  const handleWhatsAppContact = () => {
    const message = 'Halo Asyifa Koi Farm, saya ingin bertanya tentang koleksi koi Anda.';
    const whatsappUrl = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
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
            Hubungi Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Siap membantu Anda menemukan koi impian atau konsultasi perawatan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="bg-blue-600 p-3 rounded-lg">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.info}</p>
                </div>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-green-600 rounded-2xl p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-2">Chat Langsung via WhatsApp</h3>
              <p className="mb-4 opacity-90">Dapatkan respon cepat untuk pertanyaan Anda</p>
              <motion.button
                onClick={handleWhatsAppContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Chat Sekarang
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Map/Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl h-96">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
                alt="Asyifa Koi Farm Location"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Kunjungi Farm Kami</h3>
                <p className="opacity-90">Lihat langsung koleksi koi premium kami</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;