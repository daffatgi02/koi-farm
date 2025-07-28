// file: src/pages/admin/AdminDashboard.jsx
import { motion } from 'framer-motion';
import { 
  Fish, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  Eye,
  MessageCircle,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatsCard from '../../components/admin/Dashboard/StatsCard';
import RecentActivities from '../../components/admin/Dashboard/RecentActivities';
import QuickActions from '../../components/admin/Dashboard/QuickActions';
import SalesChart from '../../components/admin/Dashboard/SalesChart';
import KoiStatusChart from '../../components/admin/Dashboard/KoiStatusChart';

const AdminDashboard = () => {
  const { koiData } = useApp();

  // Calculate statistics
  const totalKoi = koiData.length;
  const availableKoi = koiData.filter(koi => koi.status === 'available').length;
  const soldKoi = koiData.filter(koi => koi.status === 'sold').length;
  const totalValue = koiData.reduce((sum, koi) => {
    const price = parseInt(koi.price.replace(/[^\d]/g, ''));
    return sum + price;
  }, 0);

  const stats = [
    {
      title: 'Total Koi',
      value: totalKoi,
      icon: Fish,
      color: 'blue',
      change: '+2.5%',
      changeType: 'increase'
    },
    {
      title: 'Tersedia',
      value: availableKoi,
      icon: Package,
      color: 'green',
      change: `${((availableKoi / totalKoi) * 100).toFixed(1)}%`,
      changeType: 'neutral'
    },
    {
      title: 'Terjual',
      value: soldKoi,
      icon: ShoppingCart,
      color: 'purple',
      change: `${((soldKoi / totalKoi) * 100).toFixed(1)}%`,
      changeType: 'neutral'
    },
    {
      title: 'Total Nilai',
      value: `Rp ${(totalValue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'yellow',
      change: '+12.3%',
      changeType: 'increase'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Selamat Datang di Dashboard Admin!</h1>
        <p className="text-blue-100">Kelola koleksi koi premium Anda dengan mudah dan efisien.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SalesChart />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <KoiStatusChart availableKoi={availableKoi} soldKoi={soldKoi} />
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="lg:col-span-2"
        >
          <RecentActivities />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <QuickActions />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;