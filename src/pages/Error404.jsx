import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export default function Error404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[--color-latar] text-[--color-teks]">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg text-center">
        <div className="flex justify-center mb-4 text-[--color-merah] text-6xl">
          <FaLock />
        </div>
        <h1 className="text-4xl font-bold font-[--font-poppins-extra] mb-2">404 Not Found</h1>
        <p className="text-[--color-teks-samping] mb-6">
          Maaf, halaman yang kamu cari tidak tersedia.
        </p>
        <Link
          to="/"
          className="inline-block bg-[--color-sidebar] hover:bg-orange-600 text-black font-semibold py-2 px-4 rounded transition"
        >
          Kembali ke Login
        </Link>
      </div>
    </div>
  );
}
