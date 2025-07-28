// file: src/components/admin/Dashboard/QuickActions.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Fish, 
  Settings, 
  BarChart3,
  Upload,
  Download
} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Tambah Koi Baru',
      description: 'Menambahkan koi ke koleksi',
      icon: Plus,
      href: '/admin/koi?action=add',
      color: 'blue'
    },
    {
      title: 'Kelola Koi',
      description: 'Lihat dan edit koleksi',
      icon: Fish,
      href: '/admin/koi',
      color: 'green'
    },
    {
      title: 'Pengaturan',
      description: 'Konfigurasi website',
      icon: Settings,
      href: '/admin/settings',
      color: 'purple'
    },
    {
      title: 'Laporan',
      description: 'Analisis penjualan',
      icon: BarChart3,
      href: '/admin/reports',
      color: 'yellow'
    },
    {
      title: 'Import Data',
      description: 'Upload data koi',
      icon: Upload,
      href: '/admin/import',
      color: 'indigo'
    },
    {
      title: 'Export Data',
      description: 'Download laporan',
      icon: Download,
      href: '/admin/export',
      color: 'pink'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    indigo: 'bg-indigo-500 hover:bg-indigo-600',
    pink: 'bg-pink-500 hover:bg-pink-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Aksi Cepat</h3>
        <p className="text-gray-600 text-sm">Shortcut untuk tugas umum</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link
              to={action.href}
              className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className={`w-8 h-8 rounded-lg ${colorClasses[action.color]} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                {action.title}
              </h4>
              <p className="text-xs text-gray-600">
                {action.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;