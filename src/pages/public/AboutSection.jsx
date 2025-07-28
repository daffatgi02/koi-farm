// file: src/components/public/AboutSection.jsx
import { motion } from 'framer-motion';
import { Award, Heart, Shield, Users } from 'lucide-react';

const AboutSection = () => {
    const features = [
        {
            icon: Award,
            title: 'Kualitas Premium',
            description: 'Kami hanya menyediakan koi berkualitas tinggi dari peternak terpercaya'
        },
        {
            icon: Heart,
            title: 'Perawatan Terbaik',
            description: 'Setiap koi mendapat perawatan khusus dengan standar internasional'
        },
        {
            icon: Shield,
            title: 'Garansi Kesehatan',
            description: 'Jaminan kesehatan koi yang kami jual dengan sertifikat resmi'
        },
        {
            icon: Users,
            title: 'Layanan Expert',
            description: 'Tim ahli kami siap membantu konsultasi pemeliharaan koi'
        }
    ];

    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                            Tentang Asyifa Koi Farm
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Asyifa Koi Farm telah berpengalaman lebih dari 10 tahun dalam budidaya dan penjualan
                            ikan koi premium. Kami berkomitmen untuk menyediakan koi berkualitas tinggi dengan
                            pelayanan terbaik kepada para penghobi koi di seluruh Indonesia.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start space-x-3"
                                >
                                    <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                                        <feature.icon className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                                        <p className="text-sm text-gray-600">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1520637736862-4d197d17c953?w=800&h=600&fit=crop"
                                alt="Asyifa Koi Farm"
                                className="w-full h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>

                        {/* Floating Stats */}
                        <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">10+</div>
                                <div className="text-sm text-gray-600">Tahun Pengalaman</div>
                            </div>
                        </div>

                        <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">1000+</div>
                                <div className="text-sm text-gray-600">Koi Berkualitas</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;