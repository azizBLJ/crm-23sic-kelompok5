import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#FEF9F5] px-4 sm:px-8 py-16 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* Judul dan Deskripsi */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-[var(--color-navbar)] mb-3">Hubungi Kami</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami senang mendengar dari Anda! Silakan hubungi kami melalui informasi di bawah ini.
          </p>
        </div>

        {/* Konten Utama */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Informasi Kontak */}
          <div className="bg-[var(--color-sidebar)] border border-yellow-300 p-8 rounded-2xl shadow-inner">
            <h3 className="text-2xl font-bold text-[var(--color-navbar)] mb-6">Informasi Kontak</h3>
            <ul className="space-y-6 text-gray-800 text-base">
              <li className="flex gap-4 items-start">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-semibold">Alamat</p>
                  <p>Jl. Yos Sudarso No. 12A, Kota Pekanbaru 28154</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-xl">📞</span>
                <div>
                  <p className="font-semibold">Telepon</p>
                  <p>+62 761 31272, 32526 (Hunting Line)</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-xl">✉️</span>
                <div>
                  <p className="font-semibold">Email</p>
                  <p>reservation@mutiaramerdekahotel.com</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-xl">🕒</span>
                <div>
                  <p className="font-semibold">Jam Operasional</p>
                  <p>Setiap Hari, 24 Jam</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Ilustrasi */}
          <div className="flex items-center justify-center">
            <img
              src="https://i.pinimg.com/736x/96/83/be/9683be95791ff3429886d65ad73e58cd.jpg"
              alt="Ilustrasi Kontak"
              className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Tombol WhatsApp */}
        <div className="text-center">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-[var(--color-navbar)] to-[var(--color-accent)] text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          >
            💬 Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
