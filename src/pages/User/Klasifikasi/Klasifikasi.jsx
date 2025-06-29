import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

function PrediksiKamar() {
  const [form, setForm] = useState({
    status: "",
    jumlahTamu: "",
    usia: "",
    jumlahBalita: "",
    budget: "",
    lamaMenginap: ""
  });

  const [hasil, setHasil] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://126c-34-125-123-66.ngrok-free.app/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: form.status,
          jumlah_tamu: parseFloat(form.jumlahTamu),
          usia: parseFloat(form.usia),
          jumlah_balita: parseFloat(form.jumlahBalita),
          budget: parseFloat(form.budget),
          lama_menginap: parseFloat(form.lamaMenginap)
        })
      });

      const data = await response.json();

      if (data.success) {
        setHasil(`Spesifikasi kamar yang cocok: ${data.predicted_label}`);
        setConfidence(data.confidence);
        if (data.accuracy) setAccuracy(data.accuracy);
      } else {
        setHasil("⚠️ Terjadi kesalahan: " + data.error);
        setConfidence(null);
        setAccuracy(null);
      }
    } catch (error) {
      console.error(error);
      setHasil("⚠️ Terjadi kesalahan saat menghubungi server.");
      setConfidence(null);
      setAccuracy(null);
    }
  };

  const chartData = [
    { name: "Jumlah Tamu", value: parseFloat(form.jumlahTamu) || 0 },
    { name: "Usia", value: parseFloat(form.usia) || 0 },
    { name: "Jumlah Balita", value: parseFloat(form.jumlahBalita) || 0 },
    { name: "Budget (Ribuan)", value: (parseFloat(form.budget) || 0) / 1000 },
    { name: "Lama Menginap", value: parseFloat(form.lamaMenginap) || 0 }
  ];

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-green-800 mb-6 text-center">
          Prediksi Spesifikasi Kamar
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Masukkan data tamu untuk mendapatkan prediksi spesifikasi kamar yang sesuai.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[ // Input numerik
              { label: "Jumlah Tamu", name: "jumlahTamu" },
              { label: "Usia", name: "usia" },
              { label: "Jumlah Balita", name: "jumlahBalita" },
              { label: "Budget (Rp)", name: "budget" },
              { label: "Lama Menginap (hari)", name: "lamaMenginap" }
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="number"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
              </div>
            ))}

            <div>
              <label className="block font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">Pilih</option>
                <option value="keluarga">Keluarga</option>
                <option value="menikah">Menikah</option>
                <option value="single">Single</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
          >
            🔍 Prediksi Sekarang
          </button>
        </form>

        {hasil && (
          <>
            <p className="mt-6 text-center text-xl font-semibold text-green-800">
              {hasil}
            </p>

            <div className="mt-6 border rounded-lg p-4 bg-green-50 border-green-200">
              <h3 className="text-md font-bold text-center mb-2 text-green-600">
                📊 Data yang Dimasukkan (Budget dalam ribuan)
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#38a169" />
                </BarChart>
              </ResponsiveContainer>

              {confidence && (
                <div className="mt-8">
                  <h3 className="text-md font-bold text-center mb-4 text-green-600">
                    📈 Confidence Prediksi
                  </h3>

                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      layout="vertical"
                      data={Object.entries(confidence).map(([label, value]) => ({
                        name: label,
                        value: value
                      }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} unit="%" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                      <Bar dataKey="value" fill="#38a169" barSize={25} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {accuracy !== null && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">🎯 Akurasi Model: <span className="font-semibold">{accuracy.toFixed(2)}%</span></p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PrediksiKamar;
