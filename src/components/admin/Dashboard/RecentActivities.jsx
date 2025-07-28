// file: src/components/admin/Dashboard/RecentActivities.jsx
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  MessageCircle,
  Clock
} from 'lucide-react';

const RecentActivities = () => {
  // Mock activities data
  const activities = [
    {
      id: 1,
      type: 'add',
      action: 'Menambahkan koi baru',
      description: 'Kohaku Premium A1 - 45cm',
      time: '2 jam yang lalu',
      icon: Plus,
      color: 'green'
    },
    {
      id: 2,
      type: 'edit',
      action: 'Mengubah status koi',
      description: 'Sanke Champion Line menjadi "Sold Out"',
      time: '4 jam yang lalu',
      icon: Edit,
      color: 'blue'
    },
    {
      id: 3,
      type: 'view',
      action: 'Detail koi dilihat',
      description: 'Showa Beauty Queen - 42cm',
      time: '6 jam yang lalu',
      icon: Eye,
      color: 'purple'
    },
    {
      id: 4,
      type: 'inquiry',
      action: 'Inquiry WhatsApp',
      description: 'Pertanyaan tentang Kohaku Premium A1',
      time: '8 jam yang lalu',
      icon: MessageCircle,
      color: 'yellow'
    },
    {
      id: 5,
      type: 'delete',
      action: 'Menghapus koi',
      description: 'Utsuri Black Dragon - 38cm',
      time: '1 hari yang lalu',
      icon: Trash2,
      color: 'red'
    }
  ];

  const colorClasses = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
          <p className="text-gray-600 text-sm">Riwayat aktivitas sistem</p>
        </div>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className={`p-2 rounded-lg ${colorClasses[activity.color]}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 mb-1">
                {activity.action}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                {activity.description}
              </p>
              <p className="text-xs text-gray-500">
                {activity.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
          Lihat semua aktivitas →
        </button>
      </div>
    </div>
  );
};

export default RecentActivities;