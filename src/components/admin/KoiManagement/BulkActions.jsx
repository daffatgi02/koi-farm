// file: src/components/admin/KoiManagement/BulkActions.jsx
import { motion } from 'framer-motion';
import { Check, Trash2, X, Package } from 'lucide-react';

const BulkActions = ({ selectedCount, onStatusChange, onDelete, onClear }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-blue-50 border border-blue-200 rounded-lg p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
            {selectedCount}
          </div>
          <span className="text-blue-800 font-medium">
            {selectedCount} koi dipilih
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onStatusChange('available')}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Check size={16} />
            <span>Set Tersedia</span>
          </button>
          
          <button
            onClick={() => onStatusChange('sold')}
            className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <Package size={16} />
            <span>Set Sold Out</span>
          </button>
          
          <button
            onClick={onDelete}
            className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <Trash2 size={16} />
            <span>Hapus</span>
          </button>
          
          <button
            onClick={onClear}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BulkActions;