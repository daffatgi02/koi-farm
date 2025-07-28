// file: src/pages/admin/AdminKoiManagement.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  MoreVertical,
  Download,
  Upload
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useSearchParams } from 'react-router-dom';
import KoiTable from '../../components/admin/KoiManagement/KoiTable';
import KoiForm from '../../components/admin/KoiManagement/KoiForm';
import DeleteConfirmModal from '../../components/admin/KoiManagement/DeleteConfirmModal';
import BulkActions from '../../components/admin/KoiManagement/BulkActions';

const AdminKoiManagement = () => {
  const { koiData, addKoi, updateKoi, deleteKoi } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingKoi, setEditingKoi] = useState(null);
  const [deleteKoi, setDeleteKoi] = useState(null);
  const [selectedKoi, setSelectedKoi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Check URL params for actions
  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'add') {
      setShowForm(true);
      setEditingKoi(null);
    }
  }, [searchParams]);

  // Filter and search logic
  const filteredKoi = koiData.filter(koi => {
    const matchesSearch = koi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         koi.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || koi.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredKoi.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedKoi = filteredKoi.slice(startIndex, startIndex + itemsPerPage);

  // Event handlers
  const handleAddKoi = () => {
    setShowForm(true);
    setEditingKoi(null);
    setSearchParams({ action: 'add' });
  };

  const handleEditKoi = (koi) => {
    setEditingKoi(koi);
    setShowForm(true);
    setSearchParams({});
  };

  const handleDeleteKoi = (koi) => {
    setDeleteKoi(koi);
  };

  const handleFormSubmit = (koiData) => {
    if (editingKoi) {
      updateKoi(editingKoi.id, koiData);
    } else {
      addKoi(koiData);
    }
    setShowForm(false);
    setEditingKoi(null);
    setSearchParams({});
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingKoi(null);
    setSearchParams({});
  };

  const handleDeleteConfirm = () => {
    if (deleteKoi) {
      deleteKoi(deleteKoi.id);
      setDeleteKoi(null);
    }
  };

  const handleBulkStatusChange = (status) => {
    selectedKoi.forEach(koiId => {
      const koi = koiData.find(k => k.id === koiId);
      if (koi) {
        updateKoi(koiId, { status });
      }
    });
    setSelectedKoi([]);
  };

  const handleBulkDelete = () => {
    selectedKoi.forEach(koiId => {
      deleteKoi(koiId);
    });
    setSelectedKoi([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Koi</h1>
          <p className="text-gray-600">Kelola koleksi ikan koi Anda</p>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
          >
            <Upload size={16} />
            <span>Import</span>
          </motion.button>
          
          <motion.button
            onClick={handleAddKoi}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Tambah Koi</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{koiData.length}</div>
          <div className="text-sm text-gray-600">Total Koi</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {koiData.filter(k => k.status === 'available').length}
          </div>
          <div className="text-sm text-gray-600">Tersedia</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">
            {koiData.filter(k => k.status === 'sold').length}
          </div>
          <div className="text-sm text-gray-600">Terjual</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-orange-600">{filteredKoi.length}</div>
          <div className="text-sm text-gray-600">Hasil Filter</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari nama koi atau jenis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
            >
              <option value="all">Semua Status</option>
              <option value="available">Tersedia</option>
              <option value="sold">Sold Out</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedKoi.length > 0 && (
          <BulkActions
            selectedCount={selectedKoi.length}
            onStatusChange={handleBulkStatusChange}
            onDelete={handleBulkDelete}
            onClear={() => setSelectedKoi([])}
          />
        )}
      </AnimatePresence>

      {/* Koi Table */}
      <KoiTable
        koi={paginatedKoi}
        selectedKoi={selectedKoi}
        setSelectedKoi={setSelectedKoi}
        onEdit={handleEditKoi}
        onDelete={handleDeleteKoi}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <KoiForm
            koi={editingKoi}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteKoi && (
          <DeleteConfirmModal
            koi={deleteKoi}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteKoi(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminKoiManagement;