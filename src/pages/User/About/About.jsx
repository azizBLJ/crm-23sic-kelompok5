import React from 'react';

// --- Mock Shadcn UI Components (simplified for demonstration) ---
// In a real project, you would import these from your shadcn/ui setup.

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-2xl font-bold text-gray-800 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

// --- About Component ---
const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Tentang Kami</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-6">
              Selamat datang di Mutiara Merdeka Hotel, destinasi pilihan Anda untuk pengalaman menginap yang tak terlupakan di Pekanbaru. Kami berkomitmen untuk menyediakan kenyamanan, keramahan, dan fasilitas terbaik bagi setiap tamu kami.
            </p>

            {/* Konten baru yang ditambahkan */}
            <p className="text-gray-700 leading-relaxed mb-6">
              Mutiara Merdeka adalah hotel bintang 4 (empat) yang terletak di jantung Kota Pekanbaru. Kami menawarkan kamar-kamar yang luas dan elegan, dilengkapi dengan fasilitas mewah untuk memastikan kenyamanan Anda.
              Nikmati momen relaksasi di kolam renang kami, atau manfaatkan ruang rapat modern dan ballroom luas yang sempurna yang dilengkapi dengan fasilitas meeting yang memadai untuk acara-acara spesial seperti wisuda atau pernikahan impian Anda. Kami berkomitmen untuk menjaga kebersihan dan kenyamanan selama Anda menginap di Mutiara Merdeka, sehingga Anda dapat merasa seperti di rumah sendiri.
            </p>
            {/* Akhir konten baru */}

            <h4 className="text-xl font-semibold text-gray-800 mb-3">Visi Kami</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Menjadi hotel terkemuka di Pekanbaru yang dikenal karena keunggulan layanan, inovasi, dan komitmen terhadap kepuasan tamu.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-3">Misi Kami</h4>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
              <li>Menyediakan akomodasi berkualitas tinggi dengan fasilitas modern.</li>
              <li>Memberikan pelayanan yang tulus dan personal kepada setiap tamu.</li>
              <li>Menciptakan lingkungan yang nyaman dan aman bagi semua pengunjung.</li>
              <li>Berinovasi secara berkelanjutan untuk memenuhi dan melampaui harapan tamu.</li>
              <li>Berperan aktif dalam pengembangan komunitas lokal.</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 mb-3">Sejarah Singkat</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Didirikan pada tahun 2005, Mutiara Merdeka Hotel telah tumbuh menjadi ikon keramahan di Pekanbaru. Dengan dedikasi terhadap keunggulan, kami terus beradaptasi dan meningkatkan layanan kami untuk memenuhi kebutuhan wisatawan modern.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-3">Nilai-nilai Kami</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-md shadow-sm">
                <h5 className="font-medium text-blue-800 mb-1">Pelayanan Prima</h5>
                <p className="text-sm text-blue-700">Kami mengutamakan kepuasan tamu dengan pelayanan yang responsif dan profesional.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-md shadow-sm">
                <h5 className="font-medium text-green-800 mb-1">Integritas</h5>
                <p className="text-sm text-green-700">Kami beroperasi dengan kejujuran, transparansi, dan etika tertinggi.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-md shadow-sm">
                <h5 className="font-medium text-yellow-800 mb-1">Inovasi</h5>
                <p className="text-sm text-yellow-700">Kami selalu mencari cara baru untuk meningkatkan pengalaman tamu.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-md shadow-sm">
                <h5 className="font-medium text-purple-800 mb-1">Kerja Tim</h5>
                <p className="text-sm text-purple-700">Kami percaya pada kekuatan kolaborasi untuk mencapai tujuan bersama.</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Terima kasih telah memilih Mutiara Merdeka Hotel. Kami berharap dapat menyambut Anda segera!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
