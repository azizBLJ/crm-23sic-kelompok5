import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Warna Pie Chart dari tema
const COLORS = ["#FFAD84", "#FFC47E", "#FFE382", "#FFF78A", "#E1B382"];

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
      const response = await fetch("https://6c23-34-83-111-21.ngrok-free.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    { name: "Budget (Ribu)", value: (parseFloat(form.budget) || 0) / 1000 },
    { name: "Lama Menginap", value: parseFloat(form.lamaMenginap) || 0 }
  ];

  return (
    <div className="min-h-screen bg-[#fef9f5] p-6 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-[var(--color-navbar)] mb-6 text-center">
          Prediksi Spesifikasi Kamar
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Masukkan data tamu untuk mendapatkan prediksi spesifikasi kamar yang sesuai.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[ 
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
                  className="input"
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
                className="input"
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
            className="button-primary w-full"
          >
            🔍 Prediksi Sekarang
          </button>
        </form>

        {hasil && (
          <>
            <p className="mt-6 text-center text-xl font-semibold text-[var(--color-navbar)]">
              {hasil}
            </p>

            <div className="mt-6 border rounded-lg p-4 bg-[var(--color-warning)]/10 border-[var(--color-warning)]">
              <h3 className="text-md font-bold text-center mb-2 text-[var(--color-navbar)]">
                📊 Data Input Tamu (Budget dalam ribuan)
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="var(--color-navbar)" />
                </BarChart>
              </ResponsiveContainer>

              {confidence && (
                <div className="mt-8">
                  <h3 className="text-md font-bold text-center mb-4 text-[var(--color-accent)]">
                    🧠 Confidence Prediksi Kelas (Pie Chart)
                  </h3>

                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.entries(confidence).map(([label, value]) => ({
                          name: label,
                          value: value
                        }))}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={(entry) => `${entry.name}: ${entry.value.toFixed(1)}%`}
                      >
                        {Object.entries(confidence).map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {accuracy !== null && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    🎯 Akurasi Model: <span className="font-semibold">{accuracy.toFixed(2)}%</span>
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-10 bg-white rounded-lg p-6 border border-[var(--color-accent)] shadow-sm">
          <h2 className="text-center text-xl font-bold text-[var(--color-navbar)] mb-4">
            📉 Visualisasi Metode Logistic Regression (Kurva Sigmoid)
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Logistic Regression menghitung probabilitas berdasarkan kurva sigmoid.
            Semakin tinggi nilai input (z), semakin mendekati 1 probabilitasnya.
          </p>
          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Logistic-curve.svg/512px-Logistic-curve.svg.png"
              alt="Kurva Sigmoid"
              className="w-full max-w-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrediksiKamar;
