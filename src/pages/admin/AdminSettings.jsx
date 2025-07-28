// file: src/pages/admin/AdminSettings.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Globe, 
  MessageSquare, 
  Palette, 
  Search,
  Settings as SettingsIcon,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import SiteSettingsForm from '../../components/admin/Settings/SiteSettingsForm';
import SEOSettingsForm from '../../components/admin/Settings/SEOSettingsForm';
import WhatsAppSettingsForm from '../../components/admin/Settings/WhatsAppSettingsForm';
import ThemeSettingsForm from '../../components/admin/Settings/ThemeSettingsForm';

const AdminSettings = () => {
  const { siteSettings, updateSiteSettings } = useApp();
  const [activeTab, setActiveTab] = useState('site');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const tabs = [
    {
      id: 'site',
      name: 'Pengaturan Situs',
      icon: Globe,
      description: 'Konfigurasi umum website'
    },
    {
      id: 'seo',
      name: 'SEO & Meta',
      icon: Search,
      description: 'Optimasi mesin pencari'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageSquare,
      description: 'Pengaturan kontak WhatsApp'
    },
    {
      id: 'theme',
      name: 'Tema & Tampilan',
      icon: Palette,
      description: 'Kustomisasi tampilan'
    }
  ];

  const handleSave = async (formData) => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateSiteSettings(formData);
      setSaveMessage('Pengaturan berhasil disimpan!');
      
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Gagal menyimpan pengaturan. Silakan coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'site':
        return <SiteSettingsForm onSave={handleSave} settings={siteSettings} />;
      case 'seo':
        return <SEOSettingsForm onSave={handleSave} settings={siteSettings} />;
      case 'whatsapp':
        return <WhatsAppSettingsForm onSave={handleSave} settings={siteSettings} />;
      case 'theme':
        return <ThemeSettingsForm onSave={handleSave} settings={siteSettings} />;
      default:
        return <SiteSettingsForm onSave={handleSave} settings={siteSettings} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pengaturan Website</h1>
          <p className="text-gray-600">Kelola konfigurasi dan pengaturan website Anda</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <SettingsIcon className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-500">Terakhir disimpan: 2 jam lalu</span>
        </div>
      </motion.div>

      {/* Save Message */}
      {saveMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`p-4 rounded-lg flex items-center space-x-3 ${
            saveMessage.includes('berhasil')
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          {saveMessage.includes('berhasil') ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span className={`text-sm font-medium ${
            saveMessage.includes('berhasil') ? 'text-green-800' : 'text-red-800'
          }`}>
            {saveMessage}
          </span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-lg border border-gray-200 p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-start space-x-3 px-3 py-3 text-left rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <div>
                    <div className="font-medium">{tab.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{tab.description}</div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="bg-white rounded-lg border border-gray-200">
            {renderTabContent()}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSettings;