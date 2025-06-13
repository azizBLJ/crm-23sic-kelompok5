import React, { useState } from "react";

const FAQ = () => {
  const [faqList, setFaqList] = useState([
    {
      id: 1,
      question: "Bagaimana cara mendaftar akun?",
      answer: "Klik tombol daftar dan isi data Anda.",
      createdAt: new Date("2025-05-10").toISOString(),
    },
    {
      id: 2,
      question: "Apa itu membership?",
      answer: "",
      createdAt: new Date("2025-06-01").toISOString(),
    },
    {
      id: 3,
      question: "Bagaimana mendapatkan poin?",
      answer: "Gunakan layanan dan kumpulkan poin.",
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
            ? { ...f, question: form.question.trim(), answer: form.answer.trim() }
            : f
        )
      );
      setEditId(null);
    } else {
      const newFaq = {
        id: faqList.length ? Math.max(...faqList.map((f) => f.id)) + 1 : 1,
        question: form.question.trim(),
        answer: form.answer.trim(),
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
    if (editId === id) {
      setForm({ question: "", answer: "" });
      setEditId(null);
    }
    setOpenId(null);
  };

  const filteredFaq = faqList.filter((faq) => {
    const matchFilter =
      filter === "semua" ||
      (filter === "belum" && (faq.answer || "").trim() === "") ||
      (filter === "sudah" && (faq.answer || "").trim() !== "");
    const matchSearch = faq.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8 bg-[#FFFDF5]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-black mb-10 tracking-wide">
          Pusat Bantuan FAQ
        </h2>

        {/* Filter & Search Section */}
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC47E]"
          >
            <option value="semua">Semua</option>
            <option value="belum">Belum Dijawab</option>
            <option value="sudah">Sudah Dijawab</option>
          </select>
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm flex-1 bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC47E]"
          />
        </div>

        {/* Form Tambah / Edit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <input
            name="question"
            placeholder="Pertanyaan"
            value={form.question}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC47E]"
          />
          <input
            name="answer"
            placeholder="Jawaban"
            value={form.answer}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC47E]"
          />
          <button
            onClick={handleSubmit}
            className="text-white font-semibold rounded-md p-3 hover:opacity-90 transition shadow-md"
            style={{ backgroundColor: "#FFC47E" }}
          >
            {editId ? "Update" : "Tambah"}
          </button>
        </div>

        {/* FAQ List */}
        {filteredFaq.map((faq) => (
          <div
            key={faq.id}
            className="mb-5 border border-gray-200 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition duration-200 ease-in-out"
          >
            <div
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="cursor-pointer font-semibold text-gray-900 text-lg hover:text-[#F6B21A] transition"
            >
              {faq.question}
            </div>
            {openId === faq.id && (
              <div className="mt-3 text-gray-700 text-sm border-t border-gray-100 pt-3">
                <p className="mb-2">
                  <strong>Jawaban:</strong>{" "}
                  {faq.answer ? faq.answer : <i>(Belum dijawab)</i>}
                </p>
                <p className="text-gray-500 text-xs">
                  Ditambahkan pada:{" "}
                  {new Date(faq.createdAt).toLocaleString("id-ID")}
                </p>
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="text-white px-4 py-1 rounded bg-[#FFC47E] hover:bg-[#E6B06F] transition duration-300 shadow-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-300 shadow-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredFaq.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Tidak ada pertanyaan yang cocok.
          </p>
        )}
      </div>
    </div>
  );
};

export default FAQ;
