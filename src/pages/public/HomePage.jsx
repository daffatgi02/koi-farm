// file: src/pages/public/HomePage.jsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import HeroSection from '../../components/public/HeroSection';
import KoiCatalog from '../../components/public/KoiCatalog';
import AboutSection from '../../components/public/AboutSection';
import ContactSection from '../../components/public/ContactSection';

const HomePage = () => {
  const { siteSettings } = useApp();

  useEffect(() => {
    // Update meta tags
    document.title = siteSettings.metaTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', siteSettings.metaDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = siteSettings.metaDescription;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, [siteSettings]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <KoiCatalog />
      <AboutSection />
      <ContactSection />
    </motion.div>
  );
};

export default HomePage;