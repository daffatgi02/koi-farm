// file: src/components/admin/KoiManagement/KoiTable.jsx
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const KoiTable = ({ 
  koi, 
  selectedKoi, 
  setSelectedKoi, 
  onEdit, 
  onDelete,
  currentPage,
  totalPages,
  onPageChange 
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleSelectAll = () => {
    if (selectedKoi.length === koi.length) {
      setSelectedKoi([]);
    } else {
      setSelectedKoi(koi.map(k => k.id));
    }
  };

  const handleSelectKoi = (koiId) => {
    if (selectedKoi.includes(koiId)) {
      setSelectedKoi(selectedKoi.filter(id => id !== koiId));
    } else {
      setSelectedKoi([...selectedKoi, koiId]);
    }
  };

  const toggleDropdown = (koiId) => {
    setDropdownOpen(dropdownOpen === koiId ? null : koiId);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedKoi.length === koi.length && koi.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Koi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jenis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ukuran
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harga
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {koi.map((koiItem, index) => (
              <motion.tr
                key={koiItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedKoi.includes(koiItem.id)}
                    onChange={() => handleSelectKoi(koiItem.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={koiItem.images[0]}
                      alt={koiItem.name}
                      className="w-12 h-12 rounded-lg object-cover mr-4"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{koiItem.name}</div>
                      <div className="text-sm text-gray-500">KOI-{koiItem.id.toString().padStart(3, '0')}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{koiItem.type}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{koiItem.size} cm</td>
                <td className="px-6 py-4 text-sm text-gray-900">{koiItem.price}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    koiItem.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {koiItem.status === 'available' ? 'Tersedia' : 'Sold Out'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/koi/${koiItem.slug}`}
                      target="_blank"
                      className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    >
                      <Eye size={16} />
                    </Link>
                    <button
                      onClick={() => onEdit(koiItem)}
                      className="text-gray-400 hover:text-green-600 transition-colors duration-200"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(koiItem)}
                      className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    {/* More Actions Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(koiItem.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {dropdownOpen === koiItem.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                        >
                          <div className="py-1">
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Duplikasi Koi
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Ubah Status
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Lihat Riwayat
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Menampilkan {((currentPage - 1) * 10) + 1} - {Math.min(currentPage * 10, koi.length)} dari {koi.length} data
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
              } transition-colors duration-200`}
            >
              <ChevronLeft size={16} />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => onPageChange(i + 1)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
              } transition-colors duration-200`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {koi.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">Tidak ada data koi</div>
          <div className="text-gray-400 text-sm">Silakan tambah koi baru atau ubah filter pencarian</div>
        </div>
      )}
    </div>
  );
};

export default KoiTable;