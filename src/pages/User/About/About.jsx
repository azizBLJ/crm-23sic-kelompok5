import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 border border-[var(--color-accent)] ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 text-center ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-3xl font-extrabold text-[var(--color-navbar)] ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-[#fef9f5] px-4 py-16 font-sans">
      <div className="max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Tentang Kami</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-6">
              Selamat datang di <span className="font-semibold text-[var(--color-navbar)]">Mutiara Merdeka Hotel</span>, destinasi pilihan Anda untuk pengalaman menginap yang tak terlupakan di Pekanbaru. Kami berkomitmen untuk menyediakan kenyamanan, keramahan, dan fasilitas terbaik bagi setiap tamu kami.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Mutiara Merdeka adalah hotel bintang 4 yang terletak di jantung Kota Pekanbaru. Kami menawarkan kamar-kamar luas dan elegan, kolam renang, ballroom, dan ruang rapat modern yang mendukung acara spesial Anda. Kenyamanan Anda adalah prioritas kami.
            </p>

            <h4 className="text-xl font-bold text-[var(--color-navbar)] mb-2">Visi Kami</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Menjadi hotel terkemuka di Pekanbaru yang dikenal karena keunggulan layanan, inovasi, dan komitmen terhadap kepuasan tamu.
            </p>

            <h4 className="text-xl font-bold text-[var(--color-navbar)] mb-2">Misi Kami</h4>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
              <li>Menyediakan akomodasi berkualitas tinggi dengan fasilitas modern.</li>
              <li>Memberikan pelayanan yang tulus dan personal kepada setiap tamu.</li>
              <li>Menciptakan lingkungan yang nyaman dan aman bagi semua pengunjung.</li>
              <li>Berinovasi secara berkelanjutan untuk memenuhi dan melampaui harapan tamu.</li>
              <li>Berperan aktif dalam pengembangan komunitas lokal.</li>
            </ul>

            <h4 className="text-xl font-bold text-[var(--color-navbar)] mb-2">Sejarah Singkat</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Didirikan pada tahun 1989, Mutiara Merdeka Hotel telah tumbuh menjadi ikon keramahan di Pekanbaru. Dengan dedikasi terhadap keunggulan, kami terus beradaptasi untuk memenuhi kebutuhan wisatawan modern.
            </p>

            <h4 className="text-xl font-bold text-[var(--color-navbar)] mb-4">Nilai-nilai Kami</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[var(--color-sidebar)] p-4 rounded-md border border-[var(--color-accent)] shadow-sm">
                <h5 className="font-semibold text-[var(--color-navbar)] mb-1">Pelayanan Prima</h5>
                <p className="text-sm text-gray-700">Kami mengutamakan kepuasan tamu dengan pelayanan yang responsif dan profesional.</p>
              </div>
              <div className="bg-[var(--color-sidebar)] p-4 rounded-md border border-[var(--color-accent)] shadow-sm">
                <h5 className="font-semibold text-[var(--color-navbar)] mb-1">Integritas</h5>
                <p className="text-sm text-gray-700">Kami beroperasi dengan kejujuran, transparansi, dan etika tertinggi.</p>
              </div>
              <div className="bg-[var(--color-sidebar)] p-4 rounded-md border border-[var(--color-accent)] shadow-sm">
                <h5 className="font-semibold text-[var(--color-navbar)] mb-1">Inovasi</h5>
                <p className="text-sm text-gray-700">Kami selalu mencari cara baru untuk meningkatkan pengalaman tamu.</p>
              </div>
              <div className="bg-[var(--color-sidebar)] p-4 rounded-md border border-[var(--color-accent)] shadow-sm">
                <h5 className="font-semibold text-[var(--color-navbar)] mb-1">Kerja Tim</h5>
                <p className="text-sm text-gray-700">Kami percaya pada kekuatan kolaborasi untuk mencapai tujuan bersama.</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Terima kasih telah memilih <span className="font-semibold text-[var(--color-navbar)]">Mutiara Merdeka Hotel</span>. Kami berharap dapat menyambut Anda segera!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
