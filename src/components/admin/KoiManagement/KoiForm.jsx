// file: src/components/admin/KoiManagement/KoiForm.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Trash2, Image as ImageIcon } from 'lucide-react';

const KoiForm = ({ koi, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        size: '',
        age: '',
        price: '',
        breeder: '',
        description: '',
        status: 'available',
        images: []
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFiles, setImageFiles] = useState([]);

    useEffect(() => {
        if (koi) {
            setFormData({
                name: koi.name || '',
                type: koi.type || '',
                size: koi.size || '',
                age: koi.age || '',
                price: koi.price || '',
                breeder: koi.breeder || '',
                description: koi.description || '',
                status: koi.status || 'available',
                images: koi.images || []
            });
        }
    }, [koi]);

    const koiTypes = [
        'Kohaku', 'Sanke', 'Showa', 'Utsuri', 'Bekko', 'Asagi', 'Shusui',
        'Koromo', 'Goshiki', 'Chagoi', 'Ochiba', 'Ki Utsuri', 'Hi Utsuri',
        'Shiro Utsuri', 'Tancho', 'Ginrin', 'Doitsu', 'Butterfly', 'Ghost'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = [];
        const newImageFiles = [];

        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    newImages.push(e.target.result);
                    if (newImages.length === files.length) {
                        setFormData(prev => ({
                            ...prev,
                            images: [...prev.images, ...newImages]
                        }));
                    }
                };
                reader.readAsDataURL(file);
                newImageFiles.push(file);
            }
        });

        setImageFiles(prev => [...prev, ...newImageFiles]);
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Nama koi wajib diisi';
        if (!formData.type.trim()) newErrors.type = 'Jenis koi wajib diisi';
        if (!formData.size.trim()) newErrors.size = 'Ukuran koi wajib diisi';
        if (!formData.age.trim()) newErrors.age = 'Umur koi wajib diisi';
        if (!formData.price.trim()) newErrors.price = 'Harga koi wajib diisi';
        if (!formData.description.trim()) newErrors.description = 'Deskripsi koi wajib diisi';
        if (formData.images.length === 0) newErrors.images = 'Minimal 1 gambar harus diupload';

        // Validate size is number
        if (formData.size && isNaN(formData.size)) {
            newErrors.size = 'Ukuran harus berupa angka';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            onSubmit(formData);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">
                        {koi ? 'Edit Koi' : 'Tambah Koi Baru'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="p-6 space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Koi *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${errors.name ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Contoh: Kohaku Premium A1"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Jenis Koi *
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${errors.type ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Pilih jenis koi</option>
                                    {koiTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ukuran (cm) *
                                </label>
                                <input
                                    type="number"
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${errors.size ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="45"
                                />
                                {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Umur *
                                </label>
                                <input
                                    type="text"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${errors.age ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="2 tahun"
                                />
                                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Harga *
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${errors.price ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Rp 2.500.000"
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Peternak
                                </label>
                                <input
                                    type="text"
                                    name="breeder"
                                    value={formData.breeder}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                    placeholder="Maruyama"
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="available"
                                        checked={formData.status === 'available'}
                                        onChange={handleChange}
                                        className="mr-2 text-blue-600 focus:ring-blue-500"
                                    />
                                    Tersedia
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="sold"
                                        checked={formData.status === 'sold'}
                                        onChange={handleChange}
                                        className="mr-2 text-blue-600 focus:ring-blue-500"
                                    />
                                    Sold Out
                                </label>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Deskripsi *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none ${errors.description ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="Deskripsi lengkap tentang koi ini..."
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gambar Koi *
                            </label>

                            {/* Upload Area */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                                    <p className="text-gray-600">Klik untuk upload gambar atau drag & drop</p>
                                    <p className="text-gray-400 text-sm mt-1">PNG, JPG hingga 10MB</p>
                                </label>
                            </div>

                            {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}

                            {/* Image Preview */}
                            {formData.images.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {formData.images.map((image, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="relative group"
                                        >
                                            <img
                                                src={image}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            Batal
                        </button>
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Menyimpan...</span>
                                </div>
                            ) : (
                                koi ? 'Update Koi' : 'Simpan Koi'
                            )}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default KoiForm;