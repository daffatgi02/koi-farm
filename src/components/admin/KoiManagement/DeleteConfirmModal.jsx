// file: src/components/admin/KoiManagement/DeleteConfirmModal.jsx
import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ koi, onConfirm, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Hapus Koi</h2>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={koi.images[0]}
              alt={koi.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{koi.name}</h3>
              <p className="text-gray-600">{koi.type} • {koi.size} cm</p>
              <p className="text-blue-600 font-medium">{koi.price}</p>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">
              <strong>Peringatan!</strong> Tindakan ini tidak dapat dibatalkan. 
              Semua data koi termasuk gambar akan dihapus secara permanen.
            </p>
          </div>

          <p className="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus koi ini? Ketik <strong>"{koi.name}"</strong> untuk konfirmasi.
          </p>

          <input
            type="text"
            placeholder={`Ketik "${koi.name}" untuk konfirmasi`}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 mb-6"
            id="confirm-input"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Batal
          </button>
          <motion.button
            onClick={() => {
              const input = document.getElementById('confirm-input');
              if (input.value === koi.name) {
                onConfirm();
              } else {
                alert('Nama koi tidak sesuai!');
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Hapus Koi
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteConfirmModal;