// file: src/components/public/Footer.jsx
import { motion } from 'framer-motion';
import { Fish, Facebook, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Mail, href: 'mailto:info@asyifakoifarm.com', label: 'Email' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Katalog Koi', href: '/#catalog' },
    { name: 'Tentang Kami', href: '/#about' },
    { name: 'Kontak', href: '/#contact' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
                <Fish className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Asyifa Koi Farm</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Menyediakan ikan koi premium berkualitas tinggi dengan pelayanan terbaik 
              untuk para penghobi koi di seluruh Indonesia.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Menu Cepat</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <div className="space-y-3 text-gray-300">
              <p>Jl. Koi Raya No. 123<br />Bogor, Jawa Barat 16610</p>
              <p>+62 812-3456-7890</p>
              <p>info@asyifakoifarm.com</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Asyifa Koi Farm. Semua hak cipta dilindungi.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;