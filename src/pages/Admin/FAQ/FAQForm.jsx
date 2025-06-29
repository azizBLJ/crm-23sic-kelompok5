import { useEffect, useState } from "react";

export default function FAQForm({ onSubmit, editingFaq, setEditingFaq }) {
  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    if (editingFaq) {
      setForm({
        question: editingFaq.pertanyaan || "",
        answer: editingFaq.jawaban || "",
      });
    } else {
      setForm({ question: "", answer: "" });
    }
  }, [editingFaq]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.question.trim()) return;
    onSubmit(form);
    setForm({ question: "", answer: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg mb-6"
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        {editingFaq ? "Edit FAQ" : "Form Tambah FAQ"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="col-span-2">
          <input
            type="text"
            name="question"
            value={form.question}
            onChange={handleChange}
            placeholder="Pertanyaan (misal: Apa saja fasilitas hotel?)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />
        </div>
        <div className="col-span-2">
          <textarea
            name="answer"
            value={form.answer}
            onChange={handleChange}
            placeholder="Jawaban dari pertanyaan..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md h-28 resize-none focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md transition"
        >
          {editingFaq ? "Update FAQ" : "Tambah FAQ"}
        </button>
        {editingFaq && (
          <button
            type="button"
            onClick={() => setEditingFaq(null)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-md"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
