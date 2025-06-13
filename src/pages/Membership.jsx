import React, { useState } from "react";

const Membership = () => {
  const [members, setMembers] = useState([
    { nama: "Zaki", level: "Gold" },
    { nama: "Nadia", level: "Platinum" },
  ]);
  const [nama, setNama] = useState("");
  const [level, setLevel] = useState("Silver");
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama) return;

    const newMember = { nama, level };

    if (editIndex !== null) {
      const updatedMembers = [...members];
      updatedMembers[editIndex] = newMember;
      setMembers(updatedMembers);
      setEditIndex(null);
    } else {
      setMembers([...members, newMember]);
    }

    setNama("");
    setLevel("Silver");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNama(members[index].nama);
    setLevel(members[index].level);
  };

  const handleDelete = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
    if (editIndex === index) {
      setNama("");
      setLevel("Silver");
      setEditIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-black mb-6">Manajemen Membership</h2>

      {/* Card Tambah Member */}
      <div className="bg-[#FFF7ED] rounded-xl shadow-md p-6 mb-6 w-full max-w-4xl">
        <h3 className="text-lg font-semibold text-black mb-4">
          {editIndex !== null ? "Edit Membership" : "Tambah Membership"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama Member"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC47E] focus:border-[#FFC47E]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC47E] focus:border-[#FFC47E]"
            >
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full text-white font-semibold py-2 rounded-md"
            style={{ backgroundColor: "#FFC47E" }}
          >
            {editIndex !== null ? "Update" : "Tambah"}
          </button>
        </form>
      </div>

      {/* Card Daftar Member */}
      <div className="bg-[#FFF7ED] rounded-xl shadow-md p-6 w-full max-w-4xl">
        <h3 className="text-lg font-semibold text-black mb-4">Daftar Member</h3>
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Level</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-4">
                  Belum ada member.
                </td>
              </tr>
            ) : (
              members.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{m.nama}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        m.level === "Platinum"
                          ? "bg-blue-500"
                          : m.level === "Gold"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {m.level}
                    </span>
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(i)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Membership;
