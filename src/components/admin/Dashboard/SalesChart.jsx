// file: src/components/admin/Dashboard/SalesChart.jsx
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const SalesChart = () => {
  // Mock data for the chart
  const salesData = [
    { month: 'Jan', sales: 12 },
    { month: 'Feb', sales: 19 },
    { month: 'Mar', sales: 15 },
    { month: 'Apr', sales: 25 },
    { month: 'May', sales: 32 },
    { month: 'Jun', sales: 28 }
  ];

  const maxSales = Math.max(...salesData.map(item => item.sales));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Penjualan Bulanan</h3>
          <p className="text-gray-600 text-sm">Jumlah koi terjual per bulan</p>
        </div>
        <div className="flex items-center text-green-600 text-sm font-medium">
          <TrendingUp className="w-4 h-4 mr-1" />
          +15.3%
        </div>
      </div>

      <div className="space-y-4">
        {salesData.map((item, index) => (
          <motion.div
            key={item.month}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 text-sm text-gray-600 font-medium">
              {item.month}
            </div>
            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.sales / maxSales) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              />
            </div>
            <div className="w-8 text-sm text-gray-900 font-semibold text-right">
              {item.sales}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total penjualan</span>
          <span className="font-semibold text-gray-900">
            {salesData.reduce((sum, item) => sum + item.sales, 0)} koi
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;