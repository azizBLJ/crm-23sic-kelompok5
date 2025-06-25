import { useEffect, useState } from "react";
import { supabase } from "../../../Supabase";
import FAQForm from "./FAQForm";
import { Edit3, Trash2 } from "lucide-react";

export default function FAQ() {
  const [faqList, setFaqList] = useState([]);
  const [editingFaq, setEditingFaq] = useState(null);

  const fetchFAQs = async () => {
    const { data, error } = await supabase
      .from("faq")
      .select("*")
      .order("tanggal_input", { ascending: false });

    if (error) console.error("Gagal ambil data FAQ:", error);
    else setFaqList(data);
  };

  const handleSubmit = async (form) => {
    if (editingFaq) {
      const { error } = await supabase
        .from("faq")
        .update({
          pertanyaan: form.question,
          jawaban: form.answer,
        })
        .eq("id", editingFaq.id);

      if (error) {
        console.error("Update gagal:", error);
        return;
      }
    } else {
      const { error } = await supabase.from("faq").insert([
        {
          pertanyaan: form.question,
          jawaban: form.answer,
          tanggal_input: new Date().toISOString().split("T")[0], // format: YYYY-MM-DD
        },
      ]);

      if (error) {
        console.error("Insert gagal:", error);
        return;
      }
    }

    setEditingFaq(null);
    await fetchFAQs();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("faq").delete().eq("id", id);
    if (!error) {
      await fetchFAQs();
    } else {
      console.error("Gagal hapus FAQ:", error);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">
        📚 FAQ Management
      </h2>

      <FAQForm
        onSubmit={handleSubmit}
        editingFaq={editingFaq}
        setEditingFaq={setEditingFaq}
      />

      <div className="mt-10 bg-white border border-gray-200 rounded-lg shadow-md">
        <table className="w-full table-auto text-sm">
          <thead className="bg-orange-100">
            <tr>
              <th className="p-3 text-left">Pertanyaan</th>
              <th className="p-3 text-left">Jawaban</th>
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {faqList.map((faq) => (
              <tr key={faq.id} className="border-t">
                <td className="p-3">{faq.pertanyaan}</td>
                <td className="p-3">
                  {faq.jawaban ? faq.jawaban : <i>Belum dijawab</i>}
                </td>
                <td className="p-3 text-gray-500">
                  {faq.tanggal_input
                    ? new Date(faq.tanggal_input).toLocaleDateString("id-ID")
                    : "-"}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setEditingFaq(faq)}
                    className="text-yellow-500 hover:text-yellow-700 mx-2"
                    title="Edit"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="text-red-600 hover:text-red-800 mx-2"
                    title="Hapus"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {faqList.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  Belum ada FAQ.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}