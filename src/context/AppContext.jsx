// file: src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [koiData, setKoiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [siteSettings, setSiteSettings] = useState({
    heroTitle: 'Asyifa Koi Farm: The Art of Living Jewels',
    heroSubtitle: 'Discover premium quality koi fish from our trusted farm',
    metaTitle: 'Asyifa Koi Farm - Premium Koi Fish Collection',
    metaDescription: 'Explore our exclusive collection of high-quality koi fish. Find your perfect koi with detailed information and expert care guidance.',
    whatsappNumber: '6281234567890'
  });
  const [filterStatus, setFilterStatus] = useState('all'); // all, available, sold

  // Simulated API calls - replace with real backend
  const fetchKoiData = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: 'Kohaku Premium A1',
          size: '45',
          price: 'Rp 2.500.000',
          status: 'available',
          type: 'Kohaku',
          age: '2 tahun',
          breeder: 'Maruyama',
          description: 'Kohaku berkualitas premium dengan pola hi yang sangat bagus dan shiroji yang bersih putih. Ikan ini memiliki potensi tumbuh menjadi juara kontes.',
          images: [
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
            'https://images.unsplash.com/photo-1520637836862-4d197d17c953?w=800'
          ],
          slug: 'kohaku-premium-a1-45cm'
        },
        {
          id: 2,
          name: 'Sanke Champion Line',
          size: '38',
          price: 'Rp 3.200.000',
          status: 'sold',
          type: 'Sanke',
          age: '1.5 tahun',
          breeder: 'Dainichi',
          description: 'Sanke dari bloodline juara dengan kombinasi warna yang sempurna. Sumi berkualitas tinggi dengan bentuk tubuh yang ideal.',
          images: [
            'https://images.unsplash.com/photo-1554919012-6ba4c12b1595?w=800',
            'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800'
          ],
          slug: 'sanke-champion-line-38cm'
        }
      ];
      setKoiData(mockData);
      setLoading(false);
    }, 1000);
  };

  const addKoi = (newKoi) => {
    const koi = {
      ...newKoi,
      id: Date.now(),
      slug: newKoi.name.toLowerCase().replace(/\s+/g, '-') + '-' + newKoi.size + 'cm'
    };
    setKoiData(prev => [...prev, koi]);
  };

  const updateKoi = (id, updatedKoi) => {
    setKoiData(prev => prev.map(koi =>
      koi.id === id ? { ...koi, ...updatedKoi } : koi
    ));
  };

  const deleteKoi = (id) => {
    setKoiData(prev => prev.filter(koi => koi.id !== id));
  };

  const updateSiteSettings = (newSettings) => {
    setSiteSettings(prev => ({ ...prev, ...newSettings }));
  };

  const filteredKoiData = koiData.filter(koi => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'available') return koi.status === 'available';
    if (filterStatus === 'sold') return koi.status === 'sold';
    return true;
  });

  useEffect(() => {
    fetchKoiData();
  }, []);

  const value = {
    koiData,
    filteredKoiData,
    loading,
    siteSettings,
    filterStatus,
    setFilterStatus,
    addKoi,
    updateKoi,
    deleteKoi,
    updateSiteSettings,
    fetchKoiData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};