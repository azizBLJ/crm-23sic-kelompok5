import React, { useState } from "react";
import { ChevronDown, ChevronUp, Edit3, Trash2 } from "lucide-react";

const FAQ = () => {
  const [faqList, setFaqList] = useState([
    {
      id: 1,
      question: "Bagaimana cara melakukan reservasi di Hotel Mutiara?",
      answer: "Anda dapat melakukan reservasi melalui website resmi kami atau menghubungi layanan resepsionis 24 jam.",
      createdAt: new Date("2025-05-10").toISOString(),
    },
    {
      id: 2,
      question: "Apakah tersedia layanan antar-jemput bandara?",
      answer: "Ya, kami menyediakan layanan antar-jemput bandara dengan biaya tambahan. Silakan hubungi kami sebelum kedatangan.",
      createdAt: new Date("2025-06-01").toISOString(),
    },
    {
      id: 3,
      question: "Fasilitas apa saja yang tersedia untuk tamu Hotel Mutiara?",
      answer: "Kami menyediakan kolam renang, pusat kebugaran, spa, restoran, ruang meeting, dan Wi-Fi gratis di seluruh area hotel.",
      createdAt: new Date("2025-06-10").toISOString(),
    },
  ]);


  const [form, setForm] = useState({ question: "", answer: "" });
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("semua");
  const [openId, setOpenId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.question.trim()) return;
    if (editId) {
      setFaqList((prev) =>
        prev.map((f) =>
          f.id === editId
            ? { ...f, question: form.question, answer: form.answer }
            : f
        )
      );
      setEditId(null);
    } else {
      const newFaq = {
        id: Date.now(),
        question: form.question,
        answer: form.answer,
        createdAt: new Date().toISOString(),
      };
      setFaqList([...faqList, newFaq]);
    }
    setForm({ question: "", answer: "" });
  };

  const handleEdit = (faq) => {
    setForm({ question: faq.question, answer: faq.answer });
    setEditId(faq.id);
    setOpenId(null);
  };

  const handleDelete = (id) => {
    setFaqList(faqList.filter((f) => f.id !== id));
    setOpenId(null);
    if (editId === id) {
      setForm({ question: "", answer: "" });
      setEditId(null);
    }
  };

  const filteredFaq = faqList.filter((faq) => {
    const byFilter =
      filter === "semua" ||
      (filter === "belum" && !faq.answer.trim()) ||
      (filter === "sudah" && faq.answer.trim());
    const bySearch = faq.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return byFilter && bySearch;
  });

  return (
    <div className="min-h-screen px-4 py-10 bg-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-3xl font-bold text-black mb-10">
          📚 Frequently Asked Questions
        </h1>

        {/* Form */}
        <div className="mb-10 space-y-4">
          <input
            name="question"
            value={form.question}
            onChange={handleChange}
            placeholder="Pertanyaan..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <textarea
            name="answer"
            value={form.answer}
            onChange={handleChange}
            placeholder="Jawaban..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md hover:opacity-90 transition"
          >
            {editId ? "Update" : "Tambah"}
          </button>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="semua">Semua</option>
            <option value="belum">Belum Dijawab</option>
            <option value="sudah">Sudah Dijawab</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Cari pertanyaan..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* FAQ List */}
        {filteredFaq.map((faq) => (
          <div
            key={faq.id}
            className="mb-5 p-5 rounded-lg bg-white border border-gray-200 shadow hover:shadow-md transition-all"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            >
              <h4 className="text-lg font-regular text-gray-800 hover:text-orange-500 transition">
                {faq.question}
              </h4>
              {openId === faq.id ? (
                <ChevronUp className="text-orange-500" />
              ) : (
                <ChevronDown className="text-gray-400" />
              )}
            </div>
            {openId === faq.id && (
              <div className="mt-3 pt-3 text-sm text-gray-700 border-t border-gray-100">
                <p className="mb-2">
                  <strong>Jawaban:</strong>{" "}
                  {faq.answer ? faq.answer : <i>(Belum dijawab)</i>}
                </p>
                <p className="text-xs text-gray-500">
                  Ditambahkan pada:{" "}
                  {new Date(faq.createdAt).toLocaleString("id-ID")}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="bg-yellow-400 text-white px-4 py-1 rounded-md flex items-center gap-1 text-sm shadow hover:bg-yellow-500"
                  >
                    <Edit3 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md flex items-center gap-1 text-sm shadow hover:bg-red-600"
                  >
                    <Trash2 size={16} /> Hapus
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredFaq.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            Tidak ada pertanyaan yang cocok.
          </p>
        )}
      </div>
    </div>
  );
};

export default FAQ;