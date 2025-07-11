import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-2xl p-8 ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-6 text-center ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-4xl font-extrabold text-blue-700 tracking-tight ${className}`}>{children}</h2>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>{children}</div>
);

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-white px-4 sm:px-8 py-16 font-sans flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <Card className="border border-blue-100">
          <CardHeader>
            <CardTitle>Hubungi Kami</CardTitle>
            <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
              Kami senang mendengar dari Anda! Silakan hubungi kami melalui informasi di bawah ini.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Info Kontak */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-inner border border-blue-200">
                <h3 className="text-2xl font-semibold text-blue-800 mb-6">Informasi Kontak</h3>
                <ul className="space-y-6 text-gray-700 text-base">
                  <li className="flex items-start gap-4">
                    <div className="text-blue-600 bg-blue-100 p-2 rounded-full">
                      📍
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Alamat</p>
                      <p>Jl. Yos Sudarso No. 12A, Kota Pekanbaru 28154</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="text-blue-600 bg-blue-100 p-2 rounded-full">
                      📞
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Telepon</p>
                      <p>+62 761 31272, 32526 (Hunting Line)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="text-blue-600 bg-blue-100 p-2 rounded-full">
                      ✉️
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p>reservation@mutiaramerdekahotel.com</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="text-blue-600 bg-blue-100 p-2 rounded-full">
                      🕒
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Jam Operasional</p>
                      <p>Setiap Hari, 24 Jam</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Ilustrasi Kontak */}
              <div className="flex items-center justify-center">
                <img
                  src="https://i.pinimg.com/736x/96/83/be/9683be95791ff3429886d65ad73e58cd.jpg"
                  alt="Contact Illustration"
                  className="w-full max-w-sm"
                />
              </div>
            </div>

            <div className="mt-12 text-center">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              >
                💬 Hubungi via WhatsApp
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
