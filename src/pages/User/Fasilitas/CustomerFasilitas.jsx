import React, { useEffect, useState } from "react";
import { supabase } from "../../../Supabase"; // Assuming Supabase is configured

export default function CustomerFasilitas() {
  const [activeFasilitas, setActiveFasilitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchActiveFasilitas();
  }, []);

  const fetchActiveFasilitas = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("fasilitas")
      .select("*")
      .eq("status_fasilitas", "Aktif") // Only fetch active facilities
      .order("nama_fasilitas", { ascending: true });

    if (!error) {
      setActiveFasilitas(data);
    } else {
      console.error("Error fetching active facilities:", error);
      setError("Failed to load facilities. Please try again later.");
    }
    setLoading(false);
  };

  const filteredFasilitas = activeFasilitas.filter((item) =>
    item.nama_fasilitas.toLowerCase().includes(query.toLowerCase()) ||
    item.lokasi_fasilitas.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        Memuat fasilitas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Fasilitas Hotel Kami
      </h1>

      <div className="max-w-3xl mx-auto mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari fasilitas atau lokasi..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200"
        />
      </div>

      {filteredFasilitas.length === 0 && (
        <div className="text-center text-gray-600 text-lg mt-10">
          Tidak ada fasilitas aktif yang ditemukan.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFasilitas.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img
              src={item.foto_fasilitas}
              alt={item.nama_fasilitas}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.nama_fasilitas}
              </h2>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Lokasi:</span>{" "}
                {item.lokasi_fasilitas}
              </p>
              {/* You can add more details here if needed for customers */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}