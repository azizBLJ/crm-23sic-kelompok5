import React, { useState, useEffect } from 'react';
import { supabase } from "../../../Supabase";

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

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openQuestion, setOpenQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFAQs = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('faq')
        .select('id, pertanyaan, jawaban')
        .order('id', { ascending: true })
        .limit(2);

      if (error) throw error;
      setFaqs(data);
    } catch (err) {
      setError("Gagal memuat FAQ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#fef9f5] px-4 py-16 font-sans">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Pertanyaan yang Sering Diajukan (FAQ)</CardTitle>
            <p className="text-gray-600 mt-2">
              Temukan jawaban atas pertanyaan umum mengenai layanan hotel kami.
            </p>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="text-center py-4 text-gray-600">Memuat pertanyaan...</div>
            )}

            {error && (
              <div className="text-center py-4 text-red-600 font-semibold">{error}</div>
            )}

            {!loading && !error && faqs.length === 0 && (
              <div className="text-center py-4 text-gray-500">Belum ada pertanyaan yang tersedia.</div>
            )}

            {!loading && !error && faqs.length > 0 && (
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-[var(--color-accent)] rounded-xl bg-[var(--color-sidebar)] shadow-md overflow-hidden"
                  >
                    <button
                      className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold text-[var(--color-navbar)] hover:bg-[var(--color-warning)] transition duration-200"
                      onClick={() => toggleQuestion(faq.id)}
                      aria-expanded={openQuestion === faq.id}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      {faq.pertanyaan}
                      <span className={`transition-transform ${openQuestion === faq.id ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>
                    {openQuestion === faq.id && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        className="px-6 py-4 bg-white text-gray-700 border-t border-[var(--color-accent)]"
                      >
                        {faq.jawaban}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
