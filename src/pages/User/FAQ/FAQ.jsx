import React, { useState, useEffect } from 'react';
import { supabase } from "../../../Supabase"; // Mengimpor instance supabase dari file terpisah

// --- Mock Shadcn UI Components (simplified for demonstration) ---
// In a real project, you would import these from your shadcn/ui setup.

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-2xl font-bold text-gray-800 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

// Note: Input, Textarea, Label, Button components are not directly used in this FAQ display,
// but are kept here as they might be part of a larger shared UI components file.
const Input = ({ type = 'text', placeholder, value, onChange, className = '', ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${className}`}
    {...props}
  />
);

const Textarea = ({ placeholder, value, onChange, className = '', ...props }) => (
  <textarea
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[100px] ${className}`}
    {...props}
  ></textarea>
);

const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
    {children}
  </label>
);

const Button = ({ children, onClick, className = '', variant = 'default', type = 'button', ...props }) => {
  let baseClasses = 'px-4 py-2 rounded-md font-semibold transition-colors duration-200';
  if (variant === 'default') {
    baseClasses += ' bg-blue-600 hover:bg-blue-700 text-white shadow-sm';
  } else if (variant === 'outline') {
    baseClasses += ' border border-gray-300 text-gray-700 hover:bg-gray-100';
  } else if (variant === 'destructive') {
    baseClasses += ' bg-red-600 hover:bg-red-700 text-white shadow-sm';
  } else if (variant === 'secondary') {
    baseClasses += ' bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm';
  }
  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};


// --- FAQ Component ---
const FAQ = () => {
  const [faqs, setFaqs] = useState([]); // State to store FAQs fetched from Supabase
  const [openQuestion, setOpenQuestion] = useState(null); // State to manage which FAQ is open
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(''); // State for error messages

  // Function to fetch FAQs from Supabase
  const fetchFAQs = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch data from the 'faq' table, selecting 'id', 'pertanyaan', and 'jawaban'
      const { data, error } = await supabase
        .from('faq')
        .select('id, pertanyaan, jawaban') // Select specific columns from your FAQ table
        .order('id', { ascending: true }); // Order by ID for consistent display

      if (error) {
        throw error;
      }
      setFaqs(data); // Update state with fetched data
    } catch (err) {
      console.error("Error fetching FAQs:", err.message);
      setError("Gagal memuat pertanyaan yang sering diajukan: " + err.message);
    } finally {
      setLoading(false); // Set loading to false after fetch attempt
    }
  };

  // Fetch FAQs when the component mounts
  useEffect(() => {
    fetchFAQs();
  }, []);

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pertanyaan yang Sering Diajukan (FAQ)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Temukan jawaban atas pertanyaan umum mengenai layanan hotel kami.
            </p>

            {loading && (
              <div className="text-center p-4 text-gray-600">Memuat pertanyaan...</div>
            )}

            {error && (
              <div className="text-center p-4 text-red-600 font-semibold">Error: {error}</div>
            )}

            {!loading && !error && faqs.length === 0 && (
              <div className="text-center p-4 text-gray-600">Belum ada pertanyaan yang tersedia.</div>
            )}

            {!loading && !error && faqs.length > 0 && (
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="flex justify-between items-center w-full p-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                      onClick={() => toggleQuestion(faq.id)}
                      aria-expanded={openQuestion === faq.id}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <span>{faq.pertanyaan}</span> {/* Use 'pertanyaan' column */}
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          openQuestion === faq.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    {openQuestion === faq.id && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        className="p-4 bg-white text-gray-700 border-t border-gray-200 animate-fade-in"
                      >
                        {faq.jawaban} {/* Use 'jawaban' column */}
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
