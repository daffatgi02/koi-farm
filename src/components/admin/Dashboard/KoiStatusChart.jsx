// file: src/components/admin/Dashboard/KoiStatusChart.jsx
import { motion } from 'framer-motion';

const KoiStatusChart = ({ availableKoi, soldKoi }) => {
  const total = availableKoi + soldKoi;
  const availablePercentage = total > 0 ? (availableKoi / total) * 100 : 0;
  const soldPercentage = total > 0 ? (soldKoi / total) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Status Koi</h3>
        <p className="text-gray-600 text-sm">Distribusi status stok koi</p>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          {/* Background Circle */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="20"
            />
            
            {/* Available Koi Arc */}
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#10b981"
              strokeWidth="20"
              strokeDasharray={`${(availablePercentage / 100) * 314} 314`}
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 314" }}
              animate={{ strokeDasharray: `${(availablePercentage / 100) * 314} 314` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            
            {/* Sold Koi Arc */}
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="20"
              strokeDasharray={`${(soldPercentage / 100) * 314} 314`}
              strokeDashoffset={-((availablePercentage / 100) * 314)}
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 314" }}
              animate={{ strokeDasharray: `${(soldPercentage / 100) * 314} 314` }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </svg>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{total}</span>
            <span className="text-xs text-gray-600">Total</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Tersedia</span>
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {availableKoi} ({availablePercentage.toFixed(1)}%)
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-600">Terjual</span>
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {soldKoi} ({soldPercentage.toFixed(1)}%)
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KoiStatusChart;