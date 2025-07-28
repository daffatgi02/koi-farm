// file: src/components/layouts/PublicLayout.jsx
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../public/Navbar';
import Footer from '../public/Footer';

const PublicLayout = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </motion.div>
  );
};

export default PublicLayout;